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

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Controller
@RequiredArgsConstructor
@CrossOrigin
public class GameController {
    private final RoomService roomService;
    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/createRoom")
    public void createRoom(@Payload RoomMessage roomMessage) {
        System.out.println("createRoom: " + roomMessage);
        RoomModel room = roomService.createRoom(roomMessage.getSenderId());
        messagingTemplate.convertAndSendToUser(roomMessage.getSenderId(), "/room", ResponseModel.builder().room(room).type(RoomMessageType.ROOM_CREATED).build());
    }

    @MessageMapping("/joinRoom")
    public void joinRoom(@Payload RoomMessage roomMessage) {
        System.out.println("joinRoom: " + roomMessage);
        RoomModel room = roomService.getRoom(roomMessage.getRoomId());
        if (room == null) {
            messagingTemplate.convertAndSendToUser(roomMessage.getSenderId(), "/room", ResponseModel.builder().error("Room not found").type(RoomMessageType.ERROR).build());
            return;
        }
        if (room.getPlayers().size() == 2) {
            messagingTemplate.convertAndSendToUser(roomMessage.getSenderId(), "/room", ResponseModel.builder().error("Room is full").type(RoomMessageType.ERROR).build());
            return;
        }
        room = roomService.joinRoom(roomMessage.getRoomId(), roomMessage.getSenderId());
        for (UserModel player : room.getPlayers()) {
            messagingTemplate.convertAndSendToUser(player.getId(), "/room", ResponseModel.builder().room(room).type(RoomMessageType.JOINED_ROOM).build());
        }
    }

    @MessageMapping("/ready")
    public void setReady(@Payload RoomMessage roomMessage) {
        String roomId = roomMessage.getRoomId();
        boolean ready = roomMessage.getMessage().equals("true");
        roomService.setReady(roomId, roomMessage.getSenderId(), ready);
        RoomModel room = roomService.getRoom(roomId);
        for (UserModel player : room.getPlayers()) {
            messagingTemplate.convertAndSendToUser(player.getId(), "/room", ResponseModel.builder().room(room).type(RoomMessageType.READY).build());
        }
    }

    @MessageMapping("/start")
    public void start(@Payload RoomMessage roomMessage) {
        String roomId = roomMessage.getRoomId();
        RoomModel room = roomService.getRoom(roomId);
        for (UserModel player : room.getPlayers()) {
            roomService.setReady(roomId, player.getId(), false);
            messagingTemplate.convertAndSendToUser(player.getId(), "/room", ResponseModel.builder().room(room).type(RoomMessageType.START).build());
        }
        System.out.println("start");
        ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);
        scheduler.schedule(() -> {
            System.out.println(roomService.getRoom(roomId));
            RoomModel room2 = roomService.getRoom(roomId);
            if (!room2.isInGame()) {
                System.out.println("No ships");
                for (UserModel player : room2.getPlayers()) {
                    messagingTemplate.convertAndSendToUser(player.getId(), "/room", ResponseModel.builder().room(room).type(RoomMessageType.NO_SHIPS).build());
                }
            }

        }, 62 * 1000, TimeUnit.MILLISECONDS);
        scheduler.shutdown();
    }

    @MessageMapping("/submitShips")
    public void submitShips(@Payload RoomMessage roomMessage) {
        String roomId = roomMessage.getRoomId();
        roomService.setReady(roomId, roomMessage.getSenderId(), true);
        RoomModel room = roomService.getRoom(roomId);
        boolean allReady = true;
        for (UserModel player : room.getPlayers()) {
            if (!player.isReady()) {
                System.out.println();
                allReady = false;
                break;
            }
        }
        if (allReady) {
            room.setInGame(true);
            String startPlayerId = room.getPlayers().get((int) (Math.random() * 2)).getId();
            for (UserModel player : room.getPlayers()) {
                roomService.setReady(roomId, player.getId(), false);
                messagingTemplate.convertAndSendToUser(player.getId(), "/room", ResponseModel.builder().room(room).type(RoomMessageType.LAUNCH).userId(startPlayerId).build());
            }
        }

    }
}
