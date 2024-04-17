package org.example.warships.cache;

import lombok.Builder;
import lombok.Data;
import org.example.warships.model.room.GameModel;
import org.example.warships.model.user.PlayerModel;
import org.example.warships.model.room.RoomModel;
import org.example.warships.model.user.UserModel;

import java.util.ArrayList;
import java.util.List;
@Data
@Builder
public class RoomEntity implements GameModel, RoomModel {
    private String id;
    private String ownerId;
    private List<UserEntity> users;
    private boolean inGame;
    private String turn;
    private boolean inCreator;

    @Override
    public List<PlayerModel> getPlayers() {
        return new ArrayList<>(users);
    }

    @Override
    public void setPlayers(List<PlayerModel> users) {
        this.users = new ArrayList<>();
        for(PlayerModel user : users){
            this.users.add((UserEntity) user);
        }
    }

    @Override
    public void setUsers(List<UserModel> users) {
        this.users = new ArrayList<>();
        for(UserModel user : users){
            this.users.add((UserEntity) user);
        }
    }

    @Override
    public void updateUser(UserModel user) {
        updateUser((UserEntity) user);
    }
    private void updateUser(UserEntity user) {
        String id= user.getId();
        for(UserEntity userEntity1 : users){
            if(userEntity1.getId().equals(id)){
                int index = users.indexOf(userEntity1);
                users.set(index, user);
                break;
            }
        }

    }
    @Override
    public void updatePlayer(PlayerModel user) {
        updateUser((UserEntity) user);

    }

    @Override
    public UserModel getUserById(String id) {
        return getUser(id);
    }

    @Override
    public PlayerModel getPlayerById(String id) {
        return getUser(id);
    }
    private UserEntity getUser(String id){
        for(UserEntity user : users){
            if(user.getId().equals(id)){
                return user;
            }
        }
        return null;
    }

    public List<UserModel> getUsers() {
        return new ArrayList<>(users);
    }


//    @Override
//    public void setUsers(List<PlayerModel> users) {
//        this.users = new ArrayList<>();
//        for(PlayerModel user : users){
//            this.users.add((UserEntity) user);
//        }
//    }
//
//    @Override
//    public void setPlayers(List<UserModel> users) {
//        this.users = new ArrayList<>();
//        for(UserModel user : users){
//            this.users.add((UserEntity) user);
//        }
//    }
//    @Override
//    public List<PlayerModel> getUsers() {
//        return new ArrayList<>(users);
//    }
}
