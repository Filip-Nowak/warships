package org.example.warships.service;

import lombok.RequiredArgsConstructor;
import org.example.warships.cache.ProfileEntity;
import org.example.warships.messages.logs.GameLog;
import org.example.warships.messages.logs.LogType;
import org.example.warships.model.GameModel;
import org.example.warships.model.PlayerModel;
import org.example.warships.model.RoomModel;
import org.example.warships.model.UserModel;
import org.example.warships.model.ship.Field;
import org.example.warships.model.ship.ShipModel;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class GameService {
    private final CacheService cacheService;
    public GameModel getGame(String roomId) {
        return cacheService.getGame(roomId);
    }

    public void startCreator(GameModel game) {
        game.setInCreator(true);
        RoomModel room = cacheService.getRoom(game.getId());
        for(UserModel user:room.getUsers()){
            user.setReady(false);
        }
        cacheService.updateRoom(room);
        cacheService.updateGame(game);
    }

    public boolean submitShips(ProfileEntity user, GameModel game, List<ShipModel> ships) {
        PlayerModel player = game.getPlayerById(user.getId());
        System.out.println("Ships submitted");
        System.out.println(player);
        player.setShips(ships);
        game.updatePlayer(player);
        System.out.println(game);
        cacheService.updateGame(game);
        for(PlayerModel p : game.getPlayers()){
            if(p.getShips()==null || p.getShips().isEmpty()){
                return false;
            }
        }
        return true;
    }

    public GameModel launch(GameModel game) {
        game.setInGame(true);
        Random random = new Random();
        game.setTurn(game.getPlayers().get(random.nextInt(game.getPlayers().size())).getId());
        for(PlayerModel player:game.getPlayers()){
            player.setHp(player.getShips().size());
            player.setHp(1);
        }
        System.out.println("Game launched");
        System.out.println(game);
        return cacheService.updateGame(game);
    }

    public LogType shoot(ProfileEntity user, GameModel game, int x,int y) {
        LogType logType = LogType.MISS;
        for(PlayerModel player:  game.getPlayers()){
            if(player.getId().equals(user.getId())){
                continue;
            }
            System.out.println("shooting to");
            System.out.println(player);
            ShipModel ship = player.getShip(x,y);
            if(ship!=null){
                if(ship.getField(x,y).isHit()){
                    return LogType.ALREADY_HIT;
                }
                logType = LogType.HIT;
                ship.getField(x,y).setHit(true);
                boolean sunken=true;
                for(Field field:ship.getFields()){
                    if(!field.isHit()){
                        sunken=false;
                        break;
                    }
                }
                if(sunken){
                    ship.setSunken(true);
                    logType = LogType.SUNKEN;
                    player.setHp(player.getHp()-1);
                    if(player.getHp()==0){
                        logType = LogType.WIN;
                    }
                }
            }
        }
        cacheService.updateGame(game);

        return logType;
    }

    public void endGame(GameModel game) {
        game.setInGame(false);
        game.setInCreator(false);
        for(PlayerModel player:game.getPlayers()){
            player.setShips(null);
            player.setHp(0);
        }
        game.setTurn(null);
        cacheService.updateGame(game);
    }
    public GameModel changeTurn(GameModel game) {
        for(PlayerModel player:game.getPlayers()){
            if(player.getId().equals(game.getTurn())){
                continue;
            }
            game.setTurn(player.getId());
            break;
        }
        return cacheService.updateGame(game);
    }
}
