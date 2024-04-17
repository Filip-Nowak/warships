package org.example.warships.model.room;

import org.example.warships.model.user.UserModel;

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
