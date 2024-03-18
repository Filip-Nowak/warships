package org.example.warships.controller;

import lombok.RequiredArgsConstructor;
import org.example.warships.model.RequestModel;
import org.example.warships.model.ResponseModel;
import org.example.warships.model.RoomMessage;
import org.example.warships.model.RoomModel;
import org.example.warships.service.RoomService;
import org.springframework.cache.CacheManager;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Objects;

@Controller
@RequiredArgsConstructor
@CrossOrigin
public class GameController {
    private final RoomService roomService;
    private final CacheManager cacheManager;
    private final SimpMessagingTemplate messagingTemplate;
    @MessageMapping("/createRoom")
    public void createRoom(@Payload RoomMessage roomMessage){
        RoomModel room = roomService.createRoom(roomMessage.getSenderId());
        messagingTemplate.convertAndSend("user/"+roomMessage.getSenderId(),room.getId());
    }
    @MessageMapping("/joinRoom")
    public void joinRoom(@Payload RoomMessage roomMessage){
        RoomModel room = roomService.getRoom(roomMessage.getRoomId());
        if(room==null){
            messagingTemplate.convertAndSend("user/"+roomMessage.getSenderId(),"Room not found");
            return;
        }
        if(room.getUsers().size()==2){
            messagingTemplate.convertAndSend("user/"+roomMessage.getSenderId(),"Room is full");
            return;
        }
        roomService.joinRoom(roomMessage.getRoomId(),roomMessage.getSenderId());
        messagingTemplate.convertAndSend("room/"+roomMessage.getRoomId(),room);
    }

}
