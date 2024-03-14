package org.example.warships.service;

import lombok.RequiredArgsConstructor;
import org.example.warships.model.RoomModel;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
@RequiredArgsConstructor
public class RoomService {

    private final CacheManager cacheManager;
    public String createRoom(String username) {
        String id=generateId();
        RoomModel roomModel = RoomModel.builder().id(id).owner(username).build();
        cacheManager.getCache("rooms").put(id, roomModel);
        return id;
    }
    public boolean joinRoom(String id, String username) {
        if(cacheManager.getCache("rooms").get(id) == null) {
            return false;
        }
        RoomModel roomModel = cacheManager.getCache("rooms").get(id, RoomModel.class);
        if(roomModel.getGuest() == null) {
            roomModel.setGuest(username);
            cacheManager.getCache("rooms").put(id, roomModel);
            return true;
        }
        return false;
    }
    public String generateId() {
        Random random;
        String id;
        do {
            random = new Random();
            id = String.valueOf(random.nextInt(100000));
        } while (cacheManager.getCache("rooms").get(id) != null);
        return id;
    }

    public RoomModel getRoom(String id) {
        return  cacheManager.getCache("rooms").get(id, RoomModel.class);
    }
}
