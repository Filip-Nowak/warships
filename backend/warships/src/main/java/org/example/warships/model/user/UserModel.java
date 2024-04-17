package org.example.warships.model.user;

import lombok.Builder;
import lombok.Data;

public interface UserModel {
    String getId();
    String getNickname();
    String getRoomId();
    boolean isReady();
    void setId(String id);
    void setNickname(String nickname);
    void setRoomId(String roomId);
    void setReady(boolean ready);

}
