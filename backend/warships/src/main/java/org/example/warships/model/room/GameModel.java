package org.example.warships.model.room;

import org.example.warships.model.user.PlayerModel;

import java.util.List;
public interface GameModel {
    String getId();
    List<PlayerModel> getPlayers();
    String getTurn();
    void setId(String roomId);
    void setPlayers(List<PlayerModel> users);
    void setTurn(String turn);
    void setInCreator(boolean inCreator);
    boolean isInCreator();
    void setInGame(boolean inGame);
    boolean isInGame();
    void updatePlayer(PlayerModel user);
    PlayerModel getPlayerById(String id);

}
