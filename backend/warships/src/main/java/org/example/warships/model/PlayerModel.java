package org.example.warships.model;

import lombok.Builder;
import lombok.Data;
import org.example.warships.model.ship.ShipModel;

import java.util.List;
public interface PlayerModel{
    String getId();
    String getNickname();
    int getHp();
    List<ShipModel>getShips();
    void setId(String id);
    void setNickname(String nickname);
    void setHp(int hp);
    void setShips(List<ShipModel> ships);
    ShipModel getShip(int x,int y);
}
