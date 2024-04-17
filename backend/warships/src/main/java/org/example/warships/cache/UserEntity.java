package org.example.warships.cache;

import lombok.Builder;
import lombok.Data;
import org.example.warships.model.user.PlayerModel;
import org.example.warships.model.user.UserModel;
import org.example.warships.model.ship.Field;
import org.example.warships.model.ship.ShipModel;

import java.util.List;
@Data
@Builder
public class UserEntity implements UserModel, PlayerModel {
    private String id;
    private String nickname;
    private String roomId;
    private boolean ready;
    private int hp;
    private List<ShipModel> ships;
    public ShipModel getShip(int x,int y){
        System.out.println("UserEntity.getShip");
        System.out.println(this.ships);
        System.out.println(ships.get(0));
        for(ShipModel ship:this.ships){
            for(Field field:ship.getFields()){
                if(field.getPos().getX()==x && field.getPos().getY()==y){
                    return ship;
                }
            }
        }
        return null;
    }
}
