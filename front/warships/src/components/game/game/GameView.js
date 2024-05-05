import Board from "../../board/board/Board";
import styles from "./gameStyle.module.css"
import StartingScreen from "../startingScreen/StartingScreen";
import EndingScreen from "../endingScreen/EndingScreen";
import BoardInfoFactory from "../../../utils/board/BoardInfoFactory";
import ShipPanel from "../shipPanel/ShipPanel";
import InfoPanel from "../infoPanel/InfoPanel";
import EnemyShips from "../endingScreen/EnemyShips";

function GameView({
                      info,
                      handleConsoleFieldClick,
                      startingScreen,
                      players,
                      startingPlayer,
                      winner,
                      returnToLobby,
                      showEnemyShips,
                      endingEnemyFields,
                      handleShowEnemyShips,
                      hideEnemyShips,
                      forfeit,
                      forfeited,
                      playerLeft,
                      playerFields,
                      enemyFields,
                      playerTurn, enemyNickname,
                      time,
                        timerDisabled
                  }) {

    return (
        <div className={styles.game}>
            <div style={{width: "50%"}}>
                <Board fields={playerFields} boardInfo={BoardInfoFactory.getSeaBoard()}/>
            </div>
            <div style={{width: "50%"}}>
                <ShipPanel forfeit={forfeit} time={time} disabled={timerDisabled}>
                    <InfoPanel info={info}></InfoPanel>
                    <Board boardInfo={BoardInfoFactory.getConsoleBoard(playerTurn)}
                           handleFieldClick={handleConsoleFieldClick} fields={enemyFields}/>
                </ShipPanel>
            </div>
            {startingScreen && winner === null ?
                <StartingScreen players={players} startingId={startingPlayer}></StartingScreen> : ""}
            {winner !== null ?
                <EndingScreen forfeited={forfeited} playerLeft={playerLeft} returnToRoom={returnToLobby} winner={winner}
                              showEnemyShips={handleShowEnemyShips}></EndingScreen> : ""}
            {showEnemyShips ? <EnemyShips hideEnemyShips={hideEnemyShips} fields={endingEnemyFields}
                                          nickname={enemyNickname}></EnemyShips> : ""}
        </div>
    )
}


export default GameView