package org.example.warships.service;

import lombok.RequiredArgsConstructor;
import org.example.warships.model.RoomModel;
import org.example.warships.model.UserModel;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class RoomService {

    private final CacheManager cacheManager;

    public UserModel createUser(String username) {
        String id = generateUserId();
        UserModel userModel = UserModel.builder().id(id).nickname(username).ready(false).build();
        cacheManager.getCache("users").put(id, userModel);
        return userModel;
    }

    public RoomModel createRoom(String userId) {
        String id = generateRoomId();
        UserModel user = cacheManager.getCache("users").get(userId, UserModel.class);
        RoomModel roomModel = RoomModel.builder().id(id).ownerId(user.getId()).players(List.of(user)).build();
        cacheManager.getCache("rooms").put(id, roomModel);
        return roomModel;
    }

    public String generateRoomId() {
        Random random;
        String id;
        do {
            random = new Random();
            id = String.valueOf(random.nextInt(10000, 99999));
        } while (cacheManager.getCache("rooms").get(id) != null);
        return id;
    }

    public String generateUserId() {
        Random random;
        String id;
        do {
            random = new Random();
            id = String.valueOf(random.nextInt(10000, 99999));
        } while (cacheManager.getCache("users").get(id) != null);
        return id;
    }

    public RoomModel getRoom(String id) {
        return cacheManager.getCache("rooms").get(id, RoomModel.class);
    }

    public RoomModel joinRoom(String roomId, String senderId) {
        RoomModel room = cacheManager.getCache("rooms").get(roomId, RoomModel.class);
        UserModel user = cacheManager.getCache("users").get(senderId, UserModel.class);
        List<UserModel> players = new ArrayList<>(room.getPlayers());
        players.add(user);
        room.setPlayers(players);
        cacheManager.getCache("rooms").put(roomId, room);
        return cacheManager.getCache("rooms").get(roomId, RoomModel.class);
    }

    public UserModel getUser(String id) {
        return cacheManager.getCache("users").get(id, UserModel.class);
    }

    public void setReady(String roomId, String senderId, boolean ready) {
        System.out.println("setReady: " + roomId + " " + senderId + " " + ready);
        RoomModel room = getRoom(roomId);
        for (UserModel player : room.getPlayers()) {
            if (player.getId().equals(senderId)) {
                player.setReady(ready);
            }
        }
        cacheManager.getCache("rooms").put(roomId, room);
    }
}
