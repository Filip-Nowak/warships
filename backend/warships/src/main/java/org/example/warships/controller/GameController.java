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
            messagingTemplate.convertAndSend("user/"+roomMessage.getSenderId(),"Room not found");
            return;
        }
        if(room.getPlayers().size()==2){
            messagingTemplate.convertAndSend("user/"+roomMessage.getSenderId(),"Room is full");
            return;
        }
        roomService.joinRoom(roomMessage.getRoomId(),roomMessage.getSenderId());
        messagingTemplate.convertAndSend("room/"+roomMessage.getRoomId(),room);
    }

}
