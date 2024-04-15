package org.example.warships.controller;

import lombok.RequiredArgsConstructor;
import org.example.warships.cache.ProfileEntity;
import org.example.warships.messages.ResponseModel;
import org.example.warships.messages.RoomMessage;
import org.example.warships.messages.RoomMessageType;
import org.example.warships.messages.logs.GameLog;
import org.example.warships.messages.logs.LogType;
import org.example.warships.model.GameModel;
import org.example.warships.model.PlayerModel;
import org.example.warships.service.GameService;
import org.example.warships.service.UserService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Controller
@RequiredArgsConstructor
public class GameController {
    private final GameService gameService;
    private final UserService userService;
    private final SimpMessagingTemplate messagingTemplate;
    @MessageMapping("/submitShips")
    public void submitShips(RoomMessage message){
        ProfileEntity user = userService.getUser(message.getSenderId());
        GameModel game = gameService.getGame(user.getRoomId());
        if(message.getShips().isEmpty()){
            return;
        }
        boolean ready=gameService.submitShips(user,game,message.getShips());
        if(ready){
            game=gameService.launch(game);
            for(PlayerModel p:game.getPlayers()){
                messagingTemplate.convertAndSendToUser(p.getId(),"/room", ResponseModel.builder().message(game.getTurn()).type(RoomMessageType.LAUNCH).build());
            }
            ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);
            scheduler.schedule(() -> {
                GameModel startedGame = gameService.getGame(user.getRoomId());
                for (PlayerModel player : startedGame.getPlayers()) {
                    messagingTemplate.convertAndSendToUser(player.getId(), "/game", GameLog.builder().type(LogType.STARTED_TURN).senderId(startedGame.getTurn()).build());
                }
            }, 5, TimeUnit.SECONDS);
        }
    }
    @MessageMapping("/shoot")
    public void shoot(@Payload GameLog gameLog){
        ProfileEntity user = userService.getUser(gameLog.getSenderId());
        GameModel game = gameService.getGame(user.getRoomId());
        if(!game.getTurn().equals(user.getId())) {
            return;
        }
        for(PlayerModel player:game.getPlayers()) {
            messagingTemplate.convertAndSendToUser(player.getId(), "/game", GameLog.builder().type(LogType.SHOOTING).senderId(user.getId()).build());
        }
        LogType result=gameService.shoot(user,game,gameLog);
        ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);
        scheduler.schedule(() -> {
            if(result==LogType.WIN || result==LogType.SUNKEN){
                for(PlayerModel player:game.getPlayers()){
                    messagingTemplate.convertAndSendToUser(player.getId(),"/game",GameLog.builder().pos(gameLog.getPos()).type(LogType.SUNKEN).senderId(user.getId()).build());
                }
            }else if(result==LogType.MISS || result==LogType.ALREADY_HIT || result==LogType.HIT){
                for(PlayerModel player:game.getPlayers()){
                    messagingTemplate.convertAndSendToUser(player.getId(),"/game",GameLog.builder().type(result).senderId(user.getId()).pos(gameLog.getPos()).build());
                }
            }
            ScheduledExecutorService scheduler1 = Executors.newScheduledThreadPool(1);
            scheduler1.schedule(() -> {
                GameModel updatedGame = gameService.getGame(user.getRoomId());
                if(result==LogType.WIN){
                    for(PlayerModel player:updatedGame.getPlayers()){
                        messagingTemplate.convertAndSendToUser(player.getId(),"/game",GameLog.builder().type(LogType.WIN).senderId(user.getId()).build());
                    }
                    gameService.endGame(updatedGame);
                    return;
                }
                updatedGame=gameService.changeTurn(updatedGame);
                for(PlayerModel player:updatedGame.getPlayers()){
                    messagingTemplate.convertAndSendToUser(player.getId(),"/game",GameLog.builder().type(LogType.STARTED_TURN).senderId(updatedGame.getTurn()).build());
                }
            }, 2, TimeUnit.SECONDS);
        }, 2, TimeUnit.SECONDS);
    }

}
