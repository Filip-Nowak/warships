//package org.example.warships.controller;
//
//import lombok.RequiredArgsConstructor;
//import org.example.warships.messages.ResponseModel;
//import org.example.warships.messages.RoomMessage;
//import org.example.warships.messages.RoomMessageType;
//import org.example.warships.model.*;
//import org.example.warships.messages.logs.GameLog;
//import org.example.warships.messages.logs.LogType;
//import org.example.warships.model.ship.Field;
//import org.example.warships.model.ship.ShipModel;
//import org.example.warships.service.RoomService;
//import org.springframework.cache.CacheManager;
//import org.springframework.messaging.handler.annotation.MessageMapping;
//import org.springframework.messaging.handler.annotation.Payload;
//import org.springframework.messaging.simp.SimpMessagingTemplate;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.CrossOrigin;
//
//import java.util.ArrayList;
//import java.util.List;
//import java.util.concurrent.Executors;
//import java.util.concurrent.ScheduledExecutorService;
//import java.util.concurrent.TimeUnit;
//
//@Controller
//@RequiredArgsConstructor
//@CrossOrigin
//public class GameController {
//    private final RoomService roomService;
//    private final SimpMessagingTemplate messagingTemplate;
//    private final CacheManager cacheManager;
//
//    @MessageMapping("/createRoom")
//    public void createRoom(@Payload RoomMessage roomMessage) {
//        System.out.println("createRoom: " + roomMessage);
//        RoomModel room = roomService.createRoom(roomMessage.getSenderId());
//        System.out.println(room);
//        messagingTemplate.convertAndSendToUser(roomMessage.getSenderId(), "/room", ResponseModel.builder().room(room).type(RoomMessageType.JOINED_ROOM).build());
//    }
//
//    @MessageMapping("/joinRoom")
//    public void joinRoom(@Payload RoomMessage roomMessage) {
//        System.out.println("joinRoom: " + roomMessage);
//        RoomModel room = roomService.getRoom(roomMessage.getRoomId());
//        if (room == null) {
//            messagingTemplate.convertAndSendToUser(roomMessage.getSenderId(), "/room", ResponseModel.builder().error("Room not found").type(RoomMessageType.ERROR).build());
//            return;
//        }
//        if (room.getPlayers().size() == 2) {
//            messagingTemplate.convertAndSendToUser(roomMessage.getSenderId(), "/room", ResponseModel.builder().error("Room is full").type(RoomMessageType.ERROR).build());
//            return;
//        }
//        room = roomService.joinRoom(roomMessage.getRoomId(), roomMessage.getSenderId());
//        for (UserModel player : room.getPlayers()) {
//            messagingTemplate.convertAndSendToUser(player.getId(), "/room", ResponseModel.builder().room(room).type(RoomMessageType.JOINED_ROOM).build());
//        }
//    }
//
//    @MessageMapping("/ready")
//    public void setReady(@Payload RoomMessage roomMessage) {
//        String roomId = roomMessage.getRoomId();
//        boolean ready = roomMessage.getMessage().equals("true");
//        roomService.setReady(roomId, roomMessage.getSenderId(), ready);
//        RoomModel room = roomService.getRoom(roomId);
//        for (UserModel player : room.getPlayers()) {
//            messagingTemplate.convertAndSendToUser(player.getId(), "/room", ResponseModel.builder().room(room).type(RoomMessageType.READY).build());
//        }
//    }
//
//    @MessageMapping("/start")
//    public void start(@Payload RoomMessage roomMessage) {
//        String roomId = roomMessage.getRoomId();
//        RoomModel room = roomService.getRoom(roomId);
//        for (UserModel player : room.getPlayers()) {
//            roomService.setReady(roomId, player.getId(), false);
//            messagingTemplate.convertAndSendToUser(player.getId(), "/room", ResponseModel.builder().room(room).type(RoomMessageType.START).build());
//        }
//    }
//
//    @MessageMapping("/submitShips")
//    public void submitShips(@Payload RoomMessage roomMessage) {
//        if (roomMessage.getShips() == null || roomMessage.getShips().isEmpty()) {
//            RoomModel roomModel = roomService.getRoom(roomMessage.getRoomId());
//            for (UserModel player : roomModel.getPlayers()) {
//                roomService.setReady(roomMessage.getRoomId(), player.getId(), false);
//                roomService.setShips(roomMessage.getRoomId(), player.getId(), null);
//                roomModel = roomService.getRoom(roomMessage.getRoomId());
//                messagingTemplate.convertAndSendToUser(player.getId(), "/room", ResponseModel.builder().userId(roomMessage.getSenderId()).room(roomModel).type(RoomMessageType.NO_SHIPS).build());
//            }
//            return;
//        }
//        String roomId = roomMessage.getRoomId();
////        roomService.setReady(roomId, roomMessage.getSenderId(), true);
//        roomService.setShips(roomId, roomMessage.getSenderId(), roomMessage.getShips());
//        RoomModel room = roomService.getRoom(roomId);
//        boolean allReady = true;
//        System.out.println(room);
//        for (UserModel player : room.getPlayers()) {
//            if (player.getShips() == null || player.getShips().isEmpty()) {
//                System.out.println();
//                allReady = false;
//                break;
//            }
//        }
//
//        if (allReady) {
//            room.setInGame(true);
//            String startPlayerId = room.getPlayers().get((int) (Math.random() * 2)).getId();
//            room.setTurn(startPlayerId);
//            room =roomService.updateRoom(room);
//            for (UserModel player : room.getPlayers()) {
//                int hp = 0;
//                for (ShipModel ship : player.getShips()) {
//                    hp += ship.getFields().size();
//                }
//                player.setHp(hp);
//                roomService.updateRoom(room);
//                roomService.setReady(roomId, player.getId(), false);
//            }
//
//            for (UserModel player : room.getPlayers()) {
//                messagingTemplate.convertAndSendToUser(player.getId(), "/room", ResponseModel.builder().room(RoomModel.builder().build()).type(RoomMessageType.LAUNCH).userId(startPlayerId).build());
//            }
//            ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);
//            scheduler.schedule(() -> {
//                RoomModel room2 = roomService.getRoom(roomId);
//                for (UserModel player : room2.getPlayers()) {
//                    messagingTemplate.convertAndSendToUser(player.getId(), "/game", GameLog.builder().type(LogType.STARTED_TURN).senderId(startPlayerId).build());
//                }
//            }, 5, TimeUnit.SECONDS);
//        }
//
//    }
//
//    @MessageMapping("/shoot")
//    public void shoot(@Payload GameLog gameLog) {
//        System.out.println("shoot: " + gameLog);
//        if (gameLog.getPos() == null) {
//            for (UserModel player : roomService.getRoom(gameLog.getRoomId()).getPlayers()) {
//                messagingTemplate.convertAndSendToUser(player.getId(), "/game", GameLog.builder().senderId(gameLog.getSenderId()).type(LogType.MISS).build());
//            }
//            return;
//        }
//
//        RoomModel room2 = roomService.getRoom(gameLog.getRoomId());
//        for (UserModel player : room2.getPlayers()) {
//            messagingTemplate.convertAndSendToUser(player.getId(), "/game", GameLog.builder().type(LogType.SHOOTING).build());
//        }
//        ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);
//        scheduler.schedule(() -> {
//            RoomModel room = roomService.getRoom(gameLog.getRoomId());
//            boolean hit = false, sunken = false, win = false, alreadyHit = false;
//            for (UserModel player : room.getPlayers()) {
//                if (!player.getId().equals(gameLog.getSenderId())) {
//                    List<ShipModel> ships = player.getShips();
//                    for (ShipModel ship : ships) {
//                        if (!ship.isSunken()) {
//                            for (Field field : ship.getFields()) {
//                                if (field.getPos().equals(gameLog.getPos())) {
//                                    if (field.isHit()) {
//                                        alreadyHit = true;
//                                        break;
//                                    }
//                                    player.setHp(player.getHp() - 1);
//                                    if (player.getHp() == 0) {
//                                        win = true;
//                                    }
//                                    field.setHit(true);
//                                    hit = true;
//                                    boolean sunkenShip = true;
//                                    for (Field f : ship.getFields()) {
//                                        if (!f.isHit()) {
//                                            sunkenShip = false;
//                                            break;
//                                        }
//                                    }
//                                    sunken = sunkenShip;
//                                }
//                            }
//                        }
//                    }
//                }
//            }
//            room = roomService.updateRoom(room);
//            GameLog log;
//            if (hit) {
//                if (sunken) {
//                    log = GameLog.builder().type(LogType.SUNKEN).senderId(gameLog.getSenderId()).pos(gameLog.getPos()).build();
////                    if (win) {
////                        for(UserModel player : room.getPlayers())
////                        {
////                            messagingTemplate.convertAndSendToUser(player.getId(), "/game",log);
////                        }
////                        roomService.endGame(room.getId());
////                        return;
////                    }
//                } else {
//                    log = GameLog.builder().type(LogType.HIT).senderId(gameLog.getSenderId()).pos(gameLog.getPos()).build();
//                }
//            } else {
//                if (alreadyHit) {
//                    log = GameLog.builder().type(LogType.ALREADY_HIT).senderId(gameLog.getSenderId()).pos(gameLog.getPos()).build();
//                } else {
//                    log = GameLog.builder().type(LogType.MISS).senderId(gameLog.getSenderId()).pos(gameLog.getPos()).build();
//                }
//            }
//            for (UserModel player : room.getPlayers()) {
//                messagingTemplate.convertAndSendToUser(player.getId(), "/game", log);
//
//            }
//            final boolean didWin=win;
//            ScheduledExecutorService scheduler2 = Executors.newScheduledThreadPool(1);
//            scheduler2.schedule(() -> {
//                RoomModel room3 = roomService.getRoom(gameLog.getRoomId());
//                if(didWin){
//                    for(UserModel player : room3.getPlayers()){
//                        messagingTemplate.convertAndSendToUser(player.getId(), "/game", ResponseModel.builder().room(room3).type(RoomMessageType.WIN).userId(gameLog.getSenderId()).build());
//                    }
//                    roomService.endGame(room3.getId());
//                    return;
//                }
//                if (room3.getPlayers().get(0).getId().equals(room3.getTurn())) {
//                    room3.setTurn(room3.getPlayers().get(1).getId());
//                } else {
//                    room3.setTurn(room3.getPlayers().get(0).getId());
//                }
//                room3=roomService.updateRoom(room3);
//                for(UserModel player :room3.getPlayers()) {
//                    messagingTemplate.convertAndSendToUser(player.getId(), "/game", GameLog.builder().type(LogType.STARTED_TURN).senderId(room3.getTurn()).build());
//                }
//
//            }, 2, TimeUnit.SECONDS);
//            scheduler2.shutdown();
//        }, 2, TimeUnit.SECONDS);
//        scheduler.shutdown();
//    }
//
//    @MessageMapping("/startTurn")
//    public void startedTurn(@Payload GameLog gameLog) {
//        System.out.println("startedTurn: " + gameLog);
//        RoomModel room = roomService.getRoom(gameLog.getRoomId());
//
//        for (UserModel player : room.getPlayers()) {
//            messagingTemplate.convertAndSendToUser(player.getId(), "/game", GameLog.builder().type(LogType.STARTED_TURN).senderId(gameLog.getSenderId()).build());
//        }
//    }
//    @MessageMapping("/test")
//    public void test(@Payload GameLog roomMessage) {
//        System.out.println("test: " + roomMessage);
//
//    }
//    @MessageMapping("/makeMove")
//    public void makeMove(@Payload GameLog roomMessage) {
//        System.out.println("makeMove: " + roomMessage);
//        RoomModel room = roomService.getRoom(roomMessage.getRoomId());
//        if (room.getPlayers().get(0).getId().equals(room.getTurn())) {
//            room.setTurn(room.getPlayers().get(1).getId());
//        } else {
//            room.setTurn(room.getPlayers().get(0).getId());
//        }
//        room=roomService.updateRoom(room);
//        for(UserModel player :room.getPlayers()) {
//            messagingTemplate.convertAndSendToUser(player.getId(), "/game", GameLog.builder().type(LogType.MOVE).senderId(roomMessage.getSenderId()).build());
//        }
//        ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);
//        scheduler.schedule(() -> {
//            RoomModel room2=roomService.getRoom(roomMessage.getRoomId());
//            for(UserModel player : room2.getPlayers()) {
//                messagingTemplate.convertAndSendToUser(player.getId(), "/game", GameLog.builder().type(LogType.TEST).senderId(room2.getTurn()).build());
//            }
//        }, 2, TimeUnit.SECONDS);
//    }
//    @MessageMapping("/returnToRoom")
//    public void returnToRoom(@Payload RoomMessage roomMessage){
//        RoomModel room = roomService.getRoom(roomMessage.getRoomId());
//        messagingTemplate.convertAndSendToUser(roomMessage.getSenderId(), "/room", ResponseModel.builder().room(room).type(RoomMessageType.RETURN_TO_ROOM).build());
//    }
//    @MessageMapping("/forfeit")
//    public void forfeit(@Payload RoomMessage roomMessage) {
//        RoomModel room = roomService.getRoom(roomMessage.getRoomId());
//        UserModel user = roomService.getUser(roomMessage.getSenderId());
//        for(UserModel player : room.getPlayers()){
//            messagingTemplate.convertAndSendToUser(player.getId(), "/game", ResponseModel.builder().room(room).type(RoomMessageType.FORFEIT).userId(user.getId()).build());
//        }
//        roomService.endGame(room.getId());
//    }
//    @MessageMapping("/leaveRoom")
//    public void leaveRoom(@Payload RoomMessage roomMessage) {
//        System.out.println("leaveRoom: " + roomMessage);
//        RoomModel room = roomService.getRoom(roomMessage.getRoomId());
//        UserModel user = roomService.getUser(roomMessage.getSenderId());
//        for(UserModel player : room.getPlayers()){
//            if(!player.getId().equals(roomMessage.getSenderId())){
//                room.setOwnerId(player.getId());
//            }
//        }
//        List<UserModel> players = new ArrayList<>(room.getPlayers());
//        players.remove(user);
//        room.setPlayers(players);
//        roomService.updateRoom(room);
//        user.setRoomId(null);
//        user.setReady(false);
//        roomService.updatePlayer(user);
//        messagingTemplate.convertAndSendToUser(user.getId(), "/room", ResponseModel.builder().userId(user.getId()).type(RoomMessageType.PLAYER_LEFT).build());
//        for(UserModel player : room.getPlayers()){
//            messagingTemplate.convertAndSendToUser(player.getId(), "/room", ResponseModel.builder().room(room).type(RoomMessageType.PLAYER_LEFT).userId(user.getId()).build());
//        }
//        if(players.isEmpty()){
//            cacheManager.getCache("rooms").evict(room.getId());
//        }
//    }
//}
