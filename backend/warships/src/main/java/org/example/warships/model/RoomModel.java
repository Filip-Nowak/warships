package org.example.warships.model;

import lombok.Builder;
import lombok.Data;
import org.example.warships.cache.UserEntity;

import java.util.List;
public interface RoomModel {
    String getId();
    String getOwnerId();
    List<UserModel> getUsers();
    void setId(String id);
    void setOwnerId(String ownerId);
    void setUsers(List<UserModel> users);
    void updateUser(UserModel user);
    UserModel getUserById(String id);

}
