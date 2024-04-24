package org.example.warships.model.user;

import java.util.List;
public interface PlayerModel{
    String getId();
    String getNickname();
    int getHp();
    void setId(String id);
    void setNickname(String nickname);
    void setHp(int hp);
    int[][] getFields();
    void setFields(int[][] fields);
}
