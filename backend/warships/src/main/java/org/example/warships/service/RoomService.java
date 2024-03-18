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
        UserModel userModel = UserModel.builder().id(id).username(username).build();
        cacheManager.getCache("users").put(id,userModel);
        return userModel;
    }
    public RoomModel createRoom(String userId) {
        String id = generateRoomId();
        UserModel user = cacheManager.getCache("users").get(userId, UserModel.class);
        RoomModel roomModel = RoomModel.builder().id(id).users(new ArrayList<>(Collections.singletonList(user))).build();
        cacheManager.getCache("rooms").put(id,roomModel);
        return roomModel;
    }
    public String generateRoomId() {
        Random random;
        String id;
        do {
            random = new Random();
            id = String.valueOf(random.nextInt(10000,99999));
        } while (cacheManager.getCache("rooms").get(id) != null);
        return id;
    }
    public String generateUserId() {
        Random random;
        String id;
        do {
            random = new Random();
            id = String.valueOf(random.nextInt(10000,99999));
        } while (cacheManager.getCache("users").get(id) != null);
        return id;
    }
    public RoomModel getRoom(String id) {
        return cacheManager.getCache("rooms").get(id, RoomModel.class);
    }

    public void joinRoom(String roomId, String senderId) {
        RoomModel room = cacheManager.getCache("rooms").get(roomId, RoomModel.class);
        UserModel user = cacheManager.getCache("users").get(senderId, UserModel.class);
        room.getUsers().add(user);
        cacheManager.getCache("rooms").put(roomId,room);
    }
}
