package org.example.warships.service;

import lombok.RequiredArgsConstructor;
import org.example.warships.cache.ProfileEntity;
import org.example.warships.cache.UserEntity;
import org.example.warships.model.RoomModel;
import org.example.warships.model.UserModel;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomService {
    private final CacheService cacheService;
    public RoomModel createRoom(ProfileEntity user){
        return cacheService.createRoom(user);
    }

    public RoomModel joinRoom(ProfileEntity user, RoomModel room) {
        user.setRoomId(room.getId());
        List<UserModel> users = new ArrayList<>(room.getUsers());
        UserEntity userEntity = UserEntity.builder().id(user.getId()).nickname(user.getNickname()).build();
        users.add(userEntity);
        room.setUsers(users);
        System.out.println("User joined room");
        System.out.println("Room: "+room);
        cacheService.updateUser(user);
        return cacheService.updateRoom(room);
    }

    public RoomModel setReady(ProfileEntity user, RoomModel room) {
        System.out.println("User set ready");
        System.out.println("Room: "+room);
        UserModel userModel = room.getUserById(user.getId());
        userModel.setReady(!userModel.isReady());
        room.updateUser(userModel);
        return cacheService.updateRoom(room);
    }



    public RoomModel getRoom(String roomId) {
        return cacheService.getRoom(roomId);
    }

    public RoomModel leaveRoom(ProfileEntity user, RoomModel room) {
        user.setRoomId(null);
        List<UserModel> users = new ArrayList<>(room.getUsers());
        users.remove(room.getUserById(user.getId()));
        room.setUsers(users);
        System.out.println("User left room");
        System.out.println("Room: "+room);
        cacheService.updateUser(user);
        return cacheService.updateRoom(room);
    }
}
