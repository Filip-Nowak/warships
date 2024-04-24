package org.example.warships.service;

import lombok.RequiredArgsConstructor;
import org.example.warships.cache.ProfileEntity;
import org.example.warships.messages.logs.LogType;
import org.example.warships.model.Board;
import org.example.warships.model.room.GameModel;
import org.example.warships.model.user.PlayerModel;
import org.example.warships.model.room.RoomModel;
import org.example.warships.model.user.UserModel;
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

    public boolean submitShips(ProfileEntity user, GameModel game, int[][]fields) {
        PlayerModel player = game.getPlayerById(user.getId());
        System.out.println("Ships submitted");
        System.out.println(player);
        player.setFields(fields);
        game.updatePlayer(player);
        System.out.println(game);
        cacheService.updateGame(game);

        for(PlayerModel p:game.getPlayers()){
            if(p.getFields()==null){
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
            Board board = new Board(player.getFields());
            player.setHp(board.countHp());
        }
        System.out.println("Game launched");
        System.out.println(game);
        return cacheService.updateGame(game);
    }

    public int shoot(ProfileEntity user, GameModel game, int x,int y) {
        for(PlayerModel player:  game.getPlayers()){
            if(player.getId().equals(user.getId())){
                continue;
            }
            System.out.println("shooting to");
            System.out.println(player);
            Board board = new Board(player.getFields());
            int result = board.shoot(x,y);
            if(result==1 || result==2){
                player.setHp(player.getHp()-1);
                cacheService.updateGame(game);
                if(player.getHp()==0){
                    return 5;
                }
            }
            return result;
        }
        return 0;
    }

    public void endGame(GameModel game) {
        game.setInGame(false);
        game.setInCreator(false);
        for(PlayerModel player:game.getPlayers()){
            player.setFields(null);
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

    public void back(GameModel game) {
        game.setInCreator(false);
        for(PlayerModel player:game.getPlayers()){
            player.setFields(null);
        }
        cacheService.updateGame(game);
    }
}
