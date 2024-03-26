package org.example.warships.model;

import lombok.Builder;
import lombok.Data;
import org.example.warships.model.ship.Ship;

import java.util.List;

@Data
@Builder
public class UserModel {
    private String id;
    private String nickname;
    private boolean ready;
    private List<Ship> ships;
    private int hp;
}
