package org.example.warships.controller;

import lombok.RequiredArgsConstructor;
import org.example.warships.cache.ProfileEntity;
import org.example.warships.cache.UserEntity;
import org.example.warships.messages.ResponseModel;
import org.example.warships.messages.RoomMessage;
import org.example.warships.messages.RoomMessageType;
import org.example.warships.messages.logs.GameLog;
import org.example.warships.messages.logs.LogType;
import org.example.warships.model.room.GameModel;
import org.example.warships.model.user.PlayerModel;
import org.example.warships.model.Pos;
import org.example.warships.service.GameService;
import org.example.warships.service.UserService;
import org.example.warships.utils.JsonConverter;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.Objects;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Controller
@RequiredArgsConstructor
public class GameController {
    private final GameService gameService;
    private final UserService userService;
    private final SimpMessagingTemplate messagingTemplate;
    private final JsonConverter jsonConverter=JsonConverter.getInstance();
    @MessageMapping("/submitShips")
    public void submitShips(RoomMessage message){
        try {
            System.out.println("submitShips");
            ProfileEntity user = userService.getUser(message.getSenderId());
            GameModel game = gameService.getGame(user.getRoomId());
//            List<ShipModel> ships = jsonConverter.fromJsonToList(message.getMessage(), ShipModel[].class);
            if (Objects.equals(message.getMessage(), "")) {
                gameService.back(game);
                for (PlayerModel player : game.getPlayers()) {
                    messagingTemplate.convertAndSendToUser(player.getId(), "/room", ResponseModel.builder().type(RoomMessageType.BACK).message("").build());
                }
                return;
            }
            int[][] fields = jsonConverter.fromJson(message.getMessage(), int[][].class);
            boolean ready=gameService.submitShips(user, game, fields);
            if (ready) {
                game = gameService.launch(game);
                for (PlayerModel p : game.getPlayers()) {
                    messagingTemplate.convertAndSendToUser(p.getId(), "/room", ResponseModel.builder().message(game.getTurn()).type(RoomMessageType.LAUNCH).build());
                }
                ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);
                scheduler.schedule(() -> {
                    GameModel startedGame = gameService.getGame(user.getRoomId());
                    for (PlayerModel player : startedGame.getPlayers()) {
                        messagingTemplate.convertAndSendToUser(player.getId(), "/game", GameLog.builder().type(LogType.STARTED_TURN).senderId(startedGame.getTurn()).build());
                    }
                }, 5, TimeUnit.SECONDS);
            }
        }catch (RuntimeException e){
            e.printStackTrace();
            messagingTemplate.convertAndSendToUser(message.getSenderId(),"/room",ResponseModel.builder().type(RoomMessageType.ERROR).message(e.getMessage()).build());
        }
    }
    @MessageMapping("/shoot")
    public void shoot(@Payload RoomMessage message){
        ProfileEntity user = userService.getUser(message.getSenderId());
        GameModel game = gameService.getGame(user.getRoomId());
        System.out.println("shoot");
        System.out.println(game);
        if(game==null||!game.isInGame()){
            return;
        }
        if(!game.getTurn().equals(user.getId())) {
            return;
        }
        if(Objects.equals(message.getMessage(), "")){
            for(PlayerModel playerModel:game.getPlayers()){
                messagingTemplate.convertAndSendToUser(playerModel.getId(),"/game",GameLog.builder().type(LogType.MISS).senderId(user.getId()).build());
            }
            ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);
            scheduler.schedule(() -> {
                GameModel updatedGame = gameService.getGame(user.getRoomId());
                updatedGame=gameService.changeTurn(updatedGame);
                for(PlayerModel player:updatedGame.getPlayers()){
                    messagingTemplate.convertAndSendToUser(player.getId(),"/game",GameLog.builder().type(LogType.STARTED_TURN).senderId(updatedGame.getTurn()).build());
                }
            }, 2, TimeUnit.SECONDS);
            return;
        }
        for(PlayerModel player:game.getPlayers()) {
            messagingTemplate.convertAndSendToUser(player.getId(), "/game", GameLog.builder().type(LogType.SHOOTING).senderId(user.getId()).build());
        }
        int x= Integer.parseInt(message.getMessage().split(";")[0]);
        int y= Integer.parseInt(message.getMessage().split(";")[1]);
        Pos pos=Pos.builder().x(x).y(y).build();
        int result=gameService.shoot(user,game,x,y);
        ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);
        scheduler.schedule(() -> {
            if(result==5 || result==2) {
                for (PlayerModel player : game.getPlayers()) {
                    messagingTemplate.convertAndSendToUser(player.getId(), "/game", GameLog.builder().pos(pos).type(LogType.SUNKEN).senderId(user.getId()).build());
                }
            }else if(result==0){
                for(PlayerModel player:game.getPlayers()){
                    messagingTemplate.convertAndSendToUser(player.getId(),"/game",GameLog.builder().type(LogType.MISS).senderId(user.getId()).pos(pos).build());
                }
            }else if(result==3){
                for(PlayerModel player:game.getPlayers()){
                    messagingTemplate.convertAndSendToUser(player.getId(),"/game",GameLog.builder().type(LogType.ALREADY_HIT).senderId(user.getId()).pos(pos).build());
                }
            }else if(result==1){
                for(PlayerModel player:game.getPlayers()){
                    messagingTemplate.convertAndSendToUser(player.getId(),"/game",GameLog.builder().type(LogType.HIT).senderId(user.getId()).pos(pos).build());
                }
            }
            ScheduledExecutorService scheduler1 = Executors.newScheduledThreadPool(1);
            scheduler1.schedule(() -> {
                GameModel updatedGame = gameService.getGame(user.getRoomId());
                if(result==5){
                    System.out.println("WIN");
                    System.out.println(updatedGame.getPlayers());
                    List<PlayerModel> players=updatedGame.getPlayers();
                    PlayerModel playerInfo= UserEntity.builder().id(user.getId()).build();
                    for(PlayerModel player:updatedGame.getPlayers()){
                        for(PlayerModel enemy:players){
                            if(!enemy.getId().equals(player.getId())){
                                playerInfo.setFields(enemy.getFields());
                                break;
                            }
                        }
                        messagingTemplate.convertAndSendToUser(player.getId(),"/game",ResponseModel.builder().type(RoomMessageType.WIN).message(jsonConverter.toJson(playerInfo)).build());
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
    @MessageMapping("/forfeit")
    public void forfeit(@Payload RoomMessage message){
        ProfileEntity user = userService.getUser(message.getSenderId());
        GameModel game = gameService.getGame(user.getRoomId());
        List<PlayerModel> players=game.getPlayers();
        PlayerModel playerInfo= UserEntity.builder().id(user.getId()).build();
        for(PlayerModel player:game.getPlayers()){
            for(PlayerModel enemy:players){
                if(!enemy.getId().equals(player.getId())){
                    playerInfo.setFields(enemy.getFields());
                    break;
                }
            }
            messagingTemplate.convertAndSendToUser(player.getId(),"/room",ResponseModel.builder().type(RoomMessageType.FORFEIT).message(jsonConverter.toJson(playerInfo)).build());
        }
        gameService.endGame(game);
    }

}
