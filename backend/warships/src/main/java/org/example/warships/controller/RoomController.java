package org.example.warships.controller;

import lombok.RequiredArgsConstructor;
import org.example.warships.exception.RoomIsFull;
import org.example.warships.exception.UserNotFound;
import org.example.warships.cache.ProfileEntity;
import org.example.warships.messages.ResponseModel;
import org.example.warships.messages.RoomMessage;
import org.example.warships.messages.RoomMessageType;
import org.example.warships.exception.RoomNotFound;
import org.example.warships.model.room.GameModel;
import org.example.warships.model.user.PlayerModel;
import org.example.warships.model.room.RoomModel;
import org.example.warships.model.user.UserModel;
import org.example.warships.service.GameService;
import org.example.warships.service.RoomService;
import org.example.warships.service.UserService;
import org.example.warships.utils.JsonConverter;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequiredArgsConstructor
public class RoomController {
    private final RoomService roomService;
    private final SimpMessagingTemplate messagingTemplate;
    private final JsonConverter jsonConverter = JsonConverter.getInstance();
    private final GameService gameService;
    private final UserService userService;

    @MessageMapping("/createRoom")
    public void createRoom(@Payload RoomMessage message) {
        try {
            ProfileEntity user = userService.getUser(message.getSenderId());
            RoomModel room = roomService.createRoom(user);
            String response = jsonConverter.toJson(room);
            messagingTemplate.convertAndSendToUser(message.getSenderId(), "/room", ResponseModel.builder().message(response).type(RoomMessageType.JOINED_ROOM).build());
        } catch (RuntimeException e) {
            e.printStackTrace();
            messagingTemplate.convertAndSendToUser(message.getSenderId(), "/room", ResponseModel.builder().message(e.getMessage()).type(RoomMessageType.ERROR).build());
        }
    }

    @MessageMapping("/joinRoom")
    public void joinRoom(@Payload RoomMessage message) {
        try {
            ProfileEntity user = userService.getUser(message.getSenderId());

            RoomModel room = roomService.getRoom(message.getRoomId());
            room = roomService.joinRoom(user, room);
            for (UserModel userModel : room.getUsers()) {
                messagingTemplate.convertAndSendToUser(userModel.getId(), "/room", ResponseModel.builder().message(jsonConverter.toJson(room)).type(RoomMessageType.JOINED_ROOM).build());
            }
        } catch (RuntimeException e){
            e.printStackTrace();
            messagingTemplate.convertAndSendToUser(message.getSenderId(), "/room", ResponseModel.builder().message(e.getMessage()).type(RoomMessageType.ERROR).build());

        }
    }

    @MessageMapping("/ready")
    public void setReady(@Payload RoomMessage message) {
        try {
            ProfileEntity user = userService.getUser(message.getSenderId());
            RoomModel room = roomService.getRoom(user.getRoomId());
            room = roomService.setReady(user, room);
            if (room.getUserById(user.getId()).isReady()) {
                for (UserModel userModel : room.getUsers()) {
                    messagingTemplate.convertAndSendToUser(userModel.getId(), "/room", ResponseModel.builder().message(message.getSenderId()).type(RoomMessageType.READY).build());
                }
            } else {
                for (UserModel userModel : room.getUsers()) {
                    messagingTemplate.convertAndSendToUser(userModel.getId(), "/room", ResponseModel.builder().message(message.getSenderId()).type(RoomMessageType.NOT_READY).build());
                }
            }
        } catch (RuntimeException e){
            e.printStackTrace();
            messagingTemplate.convertAndSendToUser(message.getSenderId(), "/room", ResponseModel.builder().message(e.getMessage()).type(RoomMessageType.ERROR).build());
        }

    }

    @MessageMapping("/start")
    public void startCreator(@Payload RoomMessage message) {
        try {
            ProfileEntity user = userService.getUser(message.getSenderId());
            GameModel game = gameService.getGame(user.getRoomId());
            gameService.startCreator(game);
            for (PlayerModel playerModel : game.getPlayers()) {
                messagingTemplate.convertAndSendToUser(playerModel.getId(), "/room", ResponseModel.builder().message("").type(RoomMessageType.START).build());
            }
        } catch (RuntimeException e){
            e.printStackTrace();
            messagingTemplate.convertAndSendToUser(message.getSenderId(), "/room", ResponseModel.builder().message(e.getMessage()).type(RoomMessageType.ERROR).build());
        }
    }

    @MessageMapping("/leaveRoom")
    public void leaveRoom(@Payload RoomMessage message) {
        try {
            ProfileEntity user = userService.getUser(message.getSenderId());
            RoomModel room = roomService.getRoom(user.getRoomId());
            if(room==null){
                throw new RuntimeException("user is not in room");
            }
            List<UserModel> players = new ArrayList<>(room.getUsers());
            roomService.leaveRoom(user, room);
            for (UserModel userModel : players) {
                messagingTemplate.convertAndSendToUser(userModel.getId(), "/room", ResponseModel.builder().message(user.getId()).type(RoomMessageType.PLAYER_LEFT).build());
            }
        } catch (RuntimeException e){
            e.printStackTrace();
            messagingTemplate.convertAndSendToUser(message.getSenderId(), "/room", ResponseModel.builder().message(e.getMessage()).type(RoomMessageType.ERROR).build());
        }
    }

    @MessageMapping("/back")
    public void back(@Payload RoomMessage message) {
        try {
            ProfileEntity user = userService.getUser(message.getSenderId());
            GameModel game = gameService.getGame(user.getRoomId());
            gameService.back(game);
            for (PlayerModel player : game.getPlayers()) {
                messagingTemplate.convertAndSendToUser(player.getId(), "/room", ResponseModel.builder().type(RoomMessageType.BACK).build());
            }
        } catch (RuntimeException e){
            e.printStackTrace();
            messagingTemplate.convertAndSendToUser(message.getSenderId(), "/room", ResponseModel.builder().message(e.getMessage()).type(RoomMessageType.ERROR).build());
        }
    }
}
