package org.example.warships.controller;

import lombok.RequiredArgsConstructor;
import org.example.warships.model.RequestModel;
import org.example.warships.model.ResponseModel;
import org.example.warships.model.RoomModel;
import org.example.warships.service.RoomService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.util.Objects;

@Controller
@RequiredArgsConstructor
public class GameController {
    private final RoomService roomService;
    @MessageMapping("/game.joinRoom")
    @SendTo("/topic/game")
    public ResponseModel joinRoom(@Payload RequestModel requestModel) {
        RoomModel roomModel = roomService.getRoom(requestModel.getId());
        if(roomModel==null){
            return ResponseModel.builder().error("Room not found").build();
        }
        if(!Objects.equals(roomModel.getGuest(), requestModel.getUsername())){
            return ResponseModel.builder().error("You are not allowed to join").build();
        }
        return null;
    }

}
