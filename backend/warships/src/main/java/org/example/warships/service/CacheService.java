package org.example.warships.service;

import lombok.RequiredArgsConstructor;
import org.example.warships.exception.UserNotFound;
import org.example.warships.cache.ProfileEntity;
import org.example.warships.cache.RoomEntity;
import org.example.warships.cache.UserEntity;
import org.example.warships.exception.RoomNotFound;
import org.example.warships.model.room.GameModel;
import org.example.warships.model.room.RoomModel;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class CacheService {
    private final CacheManager cacheManager;

    public ProfileEntity createUser(String username) {
        String id = generateUserId();
        ProfileEntity user = ProfileEntity.builder().id(id).nickname(username).build();
        putUser(user);
        return user;
    }

    public RoomModel createRoom(ProfileEntity user){
        String id = generateRoomId();
        user.setRoomId(id);
        UserEntity userEntity = UserEntity.builder().id(user.getId()).nickname(user.getNickname()).build();
        RoomEntity room = RoomEntity.builder().id(id).ownerId(user.getId()).users(new ArrayList<>(Arrays.asList(userEntity))).build();
        putUser(user);
        putRoom(room);
        return room;
    }


    public ProfileEntity updateUser(ProfileEntity user){
        putUser(user);
        return user;
    }

    public RoomModel updateRoom(RoomModel roomModel){
        RoomEntity room = (RoomEntity) roomModel;
        putRoom(room);
        return room;
    }

    public GameModel updateGame(GameModel game) {
        RoomEntity room = (RoomEntity) game;
        putRoom(room);
        return room;
    }



    public ProfileEntity getUser(String id) throws UserNotFound {
        ProfileEntity user = getUserById(id);
        if(user==null){
            throw new UserNotFound();
        }
        return user;
    }
    public RoomModel getRoom(String id) throws RoomNotFound {
        RoomEntity room = getRoomById(id);
        if(room==null){
            throw new RoomNotFound();
        }
        return room;
    }

    public GameModel getGame(String id){
        return getRoomById(id);
    }




    private String generateRoomId() {
        Random random;
        random = new Random();
        String id;
        do {
            id = String.valueOf(random.nextInt(0, 3));
        } while (getRoomById(id) != null);
        return id;
    }
    private String generateUserId() {
        Random random;
        random = new Random();
        String id;
        do {
            id = String.valueOf(random.nextInt(0, 3));
        } while (getUserById(id) != null);
        return id;
    }
    private RoomEntity getRoomById(String id){
        RoomEntity room = cacheManager.getCache("rooms").get(id, RoomEntity.class);
        return room;
    }
    private ProfileEntity getUserById(String id) throws UserNotFound {
        ProfileEntity user = cacheManager.getCache("users").get(id, ProfileEntity.class);
        return user;
    }
    private void putUser(ProfileEntity user){
        cacheManager.getCache("users").put(user.getId(), user);
        System.out.println("User added to cache");
        System.out.println(user);
        System.out.println(cacheManager.getCache("users").get(user.getId()));
    }

    private void putRoom(RoomEntity room){
        cacheManager.getCache("rooms").put(room.getId(), room);
        System.out.println("Room added to cache");
    }

    public void deleteRoom(String id) {
        cacheManager.getCache("rooms").evict(id);
        System.out.println("Room deleted from cache");
        System.out.println(cacheManager.getCache("rooms").get(id));
    }

    public void deleteUser(String userId) {
        cacheManager.getCache("users").evict(userId);
        System.out.println("User deleted from cache");
        System.out.println(cacheManager.getCache("users").get(userId));
    }
}
