package org.example.warships.controller;

import lombok.RequiredArgsConstructor;
import org.example.warships.model.*;
import org.example.warships.model.logs.GameLog;
import org.example.warships.model.logs.LogType;
import org.example.warships.service.RoomService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@Controller
@RequiredArgsConstructor
@CrossOrigin
public class GameController {
    private final RoomService roomService;
    private final SimpMessagingTemplate messagingTemplate;
    @MessageMapping("/createRoom")
    public void createRoom(@Payload RoomMessage roomMessage){
        System.out.println("createRoom: "+roomMessage);
        RoomModel room = roomService.createRoom(roomMessage.getSenderId());
        messagingTemplate.convertAndSendToUser(roomMessage.getSenderId(),"/room", ResponseModel.builder().room(room).type(RoomMessageType.CREATED_ROOM).build());
    }
    @MessageMapping("/joinRoom")
    public void joinRoom(@Payload RoomMessage roomMessage){
        System.out.println("joinRoom: "+roomMessage);
        RoomModel room = roomService.getRoom(roomMessage.getRoomId());
        if(room==null){
            messagingTemplate.convertAndSendToUser(roomMessage.getSenderId(),"/room",ResponseModel.builder().error("Room not found").type(RoomMessageType.ERROR).build());
            return;
        }
        if(room.getPlayers().size()==2){
            messagingTemplate.convertAndSendToUser(roomMessage.getSenderId(),"/room",ResponseModel.builder().error("Room is full").type(RoomMessageType.ERROR).build());
            return;
        }
        room=roomService.joinRoom(roomMessage.getRoomId(),roomMessage.getSenderId());
        for(UserModel player:room.getPlayers()){
            messagingTemplate.convertAndSendToUser(player.getId(),"/room",ResponseModel.builder().room(room).type(RoomMessageType.JOINED_ROOM).build());
        }
    }
    @MessageMapping("/ready")
    public void setReady(@Payload RoomMessage roomMessage){
        String roomId = roomMessage.getRoomId();
        boolean ready = roomMessage.getMessage().equals("true");
        roomService.setReady(roomId,roomMessage.getSenderId(),ready);
        RoomModel room = roomService.getRoom(roomId);
        for(UserModel player:room.getPlayers()){
            messagingTemplate.convertAndSendToUser(player.getId(),"/room",ResponseModel.builder().room(room).type(RoomMessageType.READY).build());
        }
    }
    @MessageMapping("/start")
    public void start(@Payload RoomMessage roomMessage){
        String roomId = roomMessage.getRoomId();
        RoomModel room = roomService.getRoom(roomId);
        for (UserModel player:room.getPlayers()){
            roomService.setReady(roomId,player.getId(),false);
            messagingTemplate.convertAndSendToUser(player.getId(),"/room",ResponseModel.builder().room(room).type(RoomMessageType.START).build());
        }
    }
    @MessageMapping("/submitShips")
    public void submitShips(@Payload GameLog gameLog){
        String roomId = gameLog.getRoomId();
        roomService.setReady(roomId,gameLog.getSender(),true);
        RoomModel room = roomService.getRoom(roomId);
        System.out.println(gameLog);
        System.out.println(room);
        boolean allReady=true;
        for(UserModel player:room.getPlayers()){
            if(!player.isReady()){
                allReady=false;
                break;
            }
        }
        if(allReady){
            for(UserModel player:room.getPlayers()){
                messagingTemplate.convertAndSendToUser(player.getId(),"/game",GameLog.builder().type(LogType.LAUNCH).build());
            }
        }
    }
}
