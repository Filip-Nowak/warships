package org.example.warships.cache;

import lombok.Builder;
import lombok.Data;
import org.example.warships.model.user.PlayerModel;
import org.example.warships.model.user.UserModel;

import java.util.List;
@Data
@Builder
public class UserEntity implements UserModel, PlayerModel {
    private String id;
    private String nickname;
    private String roomId;
    private boolean ready;
    private int hp;
    private int[][] fields;
}
