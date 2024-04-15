package org.example.warships.controller;

import lombok.RequiredArgsConstructor;
import org.example.warships.cache.ProfileEntity;
import org.example.warships.messages.ResponseModel;
import org.example.warships.messages.RoomMessage;
import org.example.warships.messages.RoomMessageType;
import org.example.warships.model.GameModel;
import org.example.warships.model.PlayerModel;
import org.example.warships.model.RoomModel;
import org.example.warships.model.UserModel;
import org.example.warships.service.CacheService;
import org.example.warships.service.GameService;
import org.example.warships.service.RoomService;
import org.example.warships.service.UserService;
import org.example.warships.utils.JsonConverter;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class RoomController {
    private final RoomService roomService;
    private final SimpMessagingTemplate messagingTemplate;
    private final JsonConverter jsonConverter=JsonConverter.getInstance();
    private final GameService gameService;
    private final UserService userService;
    @MessageMapping("/createRoom")
    public void createRoom(@Payload RoomMessage message){
        ProfileEntity user = userService.getUser(message.getSenderId());
        RoomModel room=roomService.createRoom(user);
        String response = jsonConverter.toJson(room);
        messagingTemplate.convertAndSendToUser(message.getSenderId(),"/room", ResponseModel.builder().message(response).type(RoomMessageType.JOINED_ROOM).build());
    }
    @MessageMapping("/joinRoom")
    public void joinRoom(@Payload RoomMessage message){
        ProfileEntity user = userService.getUser(message.getSenderId());
        RoomModel room = roomService.getRoom(message.getRoomId());
        room=roomService.joinRoom(user,room);
        for(UserModel userModel:room.getUsers()){
            messagingTemplate.convertAndSendToUser(userModel.getId(),"/room", ResponseModel.builder().message(jsonConverter.toJson(room)).type(RoomMessageType.JOINED_ROOM).build());
        }
    }
    @MessageMapping("/ready")
    public void setReady(@Payload RoomMessage message){
        ProfileEntity user = userService.getUser(message.getSenderId());
        RoomModel room = roomService.getRoom(user.getRoomId());
        room = roomService.setReady(user,room);
        if(room.getUserById(user.getId()).isReady()){
        for(UserModel userModel:room.getUsers()){
            messagingTemplate.convertAndSendToUser(userModel.getId(),"/room", ResponseModel.builder().message(message.getSenderId()).type(RoomMessageType.READY).build());
        }
        }else{
            for(UserModel userModel:room.getUsers()){
                messagingTemplate.convertAndSendToUser(userModel.getId(),"/room", ResponseModel.builder().message(message.getSenderId()).type(RoomMessageType.NOT_READY).build());
            }
        }
    }
    @MessageMapping("/start")
    public void startCreator(@Payload RoomMessage message){
        ProfileEntity user = userService.getUser(message.getSenderId());
        GameModel game = gameService.getGame(user.getRoomId());
            gameService.startCreator(game);
            for(PlayerModel playerModel:game.getPlayers()){
                messagingTemplate.convertAndSendToUser(playerModel.getId(),"/room", ResponseModel.builder().message("").type(RoomMessageType.START).build());
            }
    }
}
