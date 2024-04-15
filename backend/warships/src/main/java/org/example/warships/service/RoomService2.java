//package org.example.warships.service;
//
//import lombok.RequiredArgsConstructor;
//import org.example.warships.messages.ResponseModel;
//import org.example.warships.messages.RoomMessageType;
//import org.example.warships.model.RoomModel;
//import org.example.warships.model.UserModel;
//import org.example.warships.model.ship.ShipModel;
//import org.springframework.cache.CacheManager;
//import org.springframework.messaging.simp.SimpMessageSendingOperations;
//import org.springframework.stereotype.Service;
//
//import java.util.*;
//
//@Service
//@RequiredArgsConstructor
//public class RoomService {
//
//    private final CacheManager cacheManager;
//    private final SimpMessageSendingOperations messagingTemplate;
//
//    public UserModel createUser(String username) {
//        String id = generateUserId();
//        System.out.println("Creating user: " + id + " " + username);
//        UserModel userModel = UserModel.builder().id(id).nickname(username).ready(false).build();
//        cacheManager.getCache("users").put(id, userModel);
//        System.out.println("Created user: " + userModel);
//        return userModel;
//    }
//
//    public RoomModel createRoom(String userId) {
//        String id = generateRoomId();
//        UserModel user = cacheManager.getCache("users").get(userId, UserModel.class);
//        RoomModel roomModel = RoomModel.builder().id(id).ownerId(user.getId()).players(List.of(user)).build();
//        user.setRoomId(id);
//        updatePlayer(user);
//        cacheManager.getCache("rooms").put(id, roomModel);
//        return roomModel;
//    }
//
//    public String generateRoomId() {
//        Random random;
//        String id;
//        do {
//            random = new Random();
//            id = String.valueOf(random.nextInt(0, 3));
//        } while (cacheManager.getCache("rooms").get(id) != null);
//        return id;
//    }
//
//    public String generateUserId() {
//        Random random;
//        String id;
//        do {
//            random = new Random();
//            id = String.valueOf(random.nextInt(10000, 99999));
//        } while (cacheManager.getCache("users").get(id) != null);
//        return id;
//    }
//
//    public RoomModel getRoom(String id) {
//
//        return cacheManager.getCache("rooms").get(id, RoomModel.class);
//    }
//
//    public RoomModel joinRoom(String roomId, String senderId) {
//        RoomModel room = cacheManager.getCache("rooms").get(roomId, RoomModel.class);
//        UserModel user = cacheManager.getCache("users").get(senderId, UserModel.class);
//        List<UserModel> players = new ArrayList<>(room.getPlayers());
//        players.add(user);
//        room.setPlayers(players);
//        user.setRoomId(roomId);
//        updatePlayer(user);
//        cacheManager.getCache("rooms").put(roomId, room);
//        return cacheManager.getCache("rooms").get(roomId, RoomModel.class);
//    }
//
//    public UserModel getUser(String id) {
//        return cacheManager.getCache("users").get(id, UserModel.class);
//    }
//
//    public void setReady(String roomId, String senderId, boolean ready) {
//        System.out.println("setReady: " + roomId + " " + senderId + " " + ready);
//        RoomModel room = getRoom(roomId);
//        for (UserModel player : room.getPlayers()) {
//            if (player.getId().equals(senderId)) {
//                player.setReady(ready);
//            }
//        }
//        cacheManager.getCache("rooms").put(roomId, room);
//    }
//
//    public void setShips(String roomId, String senderId, List<ShipModel> ships) {
//        RoomModel room = getRoom(roomId);
//        for (UserModel player : room.getPlayers()) {
//            if (player.getId().equals(senderId)) {
//                player.setShips(ships);
//            }
//        }
//        cacheManager.getCache("rooms").put(roomId, room);
//    }
//
//    public RoomModel updateRoom(RoomModel room) {
//        cacheManager.getCache("rooms").put(room.getId(), room);
//        return getRoom(room.getId());
//    }
//
//    public UserModel updatePlayer(UserModel player) {
//        cacheManager.getCache("users").put(player.getId(), player);
//        return getUser(player.getId());
//    }
//
//    public void endGame(String id) {
//        RoomModel room = getRoom(id);
//        room.setInGame(false);
//        room.setTurn(null);
//        for (UserModel player : room.getPlayers()) {
//            player.setReady(false);
//            player.setHp(0);
//            player.setShips(null);
//        }
//        cacheManager.getCache("rooms").put(id, room);
//    }
//
//
//
//    public void removeUser(String id) {
//        UserModel user = getUser(id);
//        if (user.getRoomId() != null) {
//            RoomModel room = getRoom(user.getRoomId());
//            boolean inGame = room.isInGame();
//            List<UserModel> players = new ArrayList<>(room.getPlayers());
//            players.remove(user);
//            System.out.println("players: " + players);
//            if (players.isEmpty()) {
//                cacheManager.getCache("rooms").evict(room.getId());
//            } else {
//
//                if(room.isInGame()){
//                    for (UserModel player : players) {
//                        messagingTemplate.convertAndSendToUser(player.getId(), "/game", ResponseModel.builder().room(room).type(RoomMessageType.PLAYER_LEFT).userId(id).build());
//                    }
//                    endGame(room.getId());
//                    room.setOwnerId(players.get(0).getId());
//                    room.setPlayers(players);
//                    updateRoom(room);
//                }else
//                {
//                    room.setOwnerId(players.get(0).getId());
//                    room.setPlayers(players);
//                    updateRoom(room);
//                    endGame(room.getId());
//                    for (UserModel player : players) {
//                        messagingTemplate.convertAndSendToUser(player.getId(), "/room", ResponseModel.builder().room(room).type(RoomMessageType.PLAYER_LEFT).build());
//                    }
//                }
//            }
//            System.out.println("updated room: " + getRoom(user.getRoomId()));
//        }
//        cacheManager.getCache("users").evict(id);
//    }
//}
