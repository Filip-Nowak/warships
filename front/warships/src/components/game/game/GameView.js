import Board from "../../board/board/Board";
import styles from "./gameStyle.module.css"
import StartingScreen from "../startingScreen/StartingScreen";
import EndingScreen from "../endingScreen/EndingScreen";
import BoardFactory from "../../utils/board/boardFactory";
import ShipPanel from "../shipPanel/ShipPanel";
import InfoPanel from "../infoPanel/InfoPanel";
import EnemyShips from "../endingScreen/EnemyShips";

function GameView({

                      infoPanelContent,
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
                      playerTurn, enemyNickname
                  }) {

    return (
        <div className={styles.game}>
            <div style={{width: "50%"}}>
                <Board fields={playerFields} boardInfo={BoardFactory.getSeaBoard()}/>
            </div>
            <div style={{width: "50%"}}>
                <ShipPanel forfeit={forfeit}>
                    <InfoPanel info={infoPanelContent}></InfoPanel>
                    <Board boardInfo={BoardFactory.getConsoleBoard(playerTurn)}
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