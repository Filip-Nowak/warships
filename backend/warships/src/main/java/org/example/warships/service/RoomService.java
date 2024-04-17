package org.example.warships.service;

import lombok.RequiredArgsConstructor;
import org.example.warships.cache.ProfileEntity;
import org.example.warships.cache.UserEntity;
import org.example.warships.exception.RoomIsFull;
import org.example.warships.messages.ResponseModel;
import org.example.warships.messages.RoomMessageType;
import org.example.warships.exception.RoomNotFound;
import org.example.warships.model.room.GameModel;
import org.example.warships.model.user.PlayerModel;
import org.example.warships.model.room.RoomModel;
import org.example.warships.model.user.UserModel;
import org.example.warships.utils.JsonConverter;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomService {
    private final CacheService cacheService;
    private final SimpMessagingTemplate messagingTemplate;
    private final GameService gameService;
    private final JsonConverter jsonConverter=JsonConverter.getInstance();

    public RoomModel createRoom(ProfileEntity user){
        return cacheService.createRoom(user);
    }

    public RoomModel joinRoom(ProfileEntity user, RoomModel room) throws RoomIsFull {
        user.setRoomId(room.getId());
        List<UserModel> users = new ArrayList<>(room.getUsers());
        if(users.size()>=2){
            throw new RoomIsFull();
        }
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



    public RoomModel getRoom(String roomId) throws RoomNotFound {
        return cacheService.getRoom(roomId);
    }

    public RoomModel leaveRoom(ProfileEntity user, RoomModel room) {
        user.setRoomId(null);
        List<UserModel> users = new ArrayList<>(room.getUsers());
        users.remove(room.getUserById(user.getId()));
        if(users.isEmpty()){
            cacheService.deleteRoom(room.getId());
            return null;
        }
        room.setUsers(users);
        if(room.getOwnerId().equals(user.getId())){
            room.setOwnerId(users.get(0).getId());
        }
        System.out.println("User left room");
        System.out.println("Room: "+room);
        cacheService.updateUser(user);
        return cacheService.updateRoom(room);
    }

    public void removeUser(String userId) {
        ProfileEntity user = cacheService.getUser(userId);
        String message= userId;
        if(user.getRoomId()!=null){
            String destination = "/room";
            GameModel game = cacheService.getGame(user.getRoomId());
            if(game.isInGame()){
                destination = "/game";
                PlayerModel info=UserEntity.builder().id(userId).ships(game.getPlayerById(userId).getShips()).build();
                System.out.println("chuj");
                System.out.println(info);
                message = jsonConverter.toJson(info);
                System.out.println(message);
                gameService.endGame(game);
            }
            RoomModel room = cacheService.getRoom(user.getRoomId());
            leaveRoom(user,room);
            for(UserModel userModel:room.getUsers()){
                messagingTemplate.convertAndSendToUser(userModel.getId(),destination, ResponseModel.builder().message(message).type(RoomMessageType.PLAYER_LEFT).build());
            }
        }
        cacheService.deleteUser(userId);
    }

}
