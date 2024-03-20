package org.example.warships.controller;

import lombok.RequiredArgsConstructor;
import org.example.warships.model.*;
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
        ResponseModel responseModel = ResponseModel.builder().room(room).type(RoomMessageType.JOINED_ROOM).build();
        messagingTemplate.convertAndSendToUser(room.getOwnerId().getId(),"/room",ResponseModel.builder().room(room).type(RoomMessageType.JOINED_ROOM).build());
        for(UserModel player:room.getPlayers()){
            messagingTemplate.convertAndSendToUser(player.getId(),"/room",ResponseModel.builder().room(room).type(RoomMessageType.JOINED_ROOM).build());
        }
    }
    @MessageMapping("/ready")
    public void test(@Payload RoomMessage roomMessage){
        String roomId = roomMessage.getRoomId();
        boolean ready = roomMessage.getMessage().equals("true");
        roomService.setReady(roomId,roomMessage.getSenderId(),ready);
        RoomModel room = roomService.getRoom(roomId);
        System.out.println(room.getPlayers());
        messagingTemplate.convertAndSendToUser(room.getOwnerId().getId(),"/room",ResponseModel.builder().room(room).type(RoomMessageType.READY).build());
        for(UserModel player:room.getPlayers()){
            System.out.println("sending ready to "+player.getId());
            messagingTemplate.convertAndSendToUser(player.getId(),"/room",ResponseModel.builder().room(room).type(RoomMessageType.READY).build());
        }
    }
}
