import Board from "../../board/board/Board";
import styles from "./gameStyle.module.css"
import StartingScreen from "../startingScreen/StartingScreen";
import EndingScreen from "../endingScreen/EndingScreen";
import BoardFactory from "../../utils/board/boardFactory";
import ShipPanel from "../shipPanel/ShipPanel";
import InfoPanel from "../infoPanel/InfoPanel";

function GameView({
                      // playerShips,
                      // enemyShips,
                      // playerMisses,
                      // enemyMisses,
                      infoPanelContent,
                      handleConsoleFieldClick,
                      startingScreen,
                      players,
                      startingPlayer,
                      // shootingPos,
                      winner,
                      returnToLobby,
                      // pickingField,
                      // showEnemyShips,
                      // endingEnemyShips,
                      handleShowEnemyShips,
                      // hideEnemyShips,
                      forfeit,
                      forfeited,
                      playerLeft,
                        playerFields,
    enemyFields,
    playerTurn
                  }) {
    // let playerFieldStyle = [
    //     fieldStyles.seaField,
    //     fieldStyles.ship,
    //     fieldStyles.hit,
    //     fieldStyles.sunken,
    //     fieldStyles.enemyMissed
    // ]
    // let enemyFieldStyle = [
    //     fieldStyles.consoleField,
    //     fieldStyles.consoleHit,
    //     fieldStyles.consoleSunken,
    //     fieldStyles.consoleMissed
    //
    // ]

    // const generateEnemyFields = (fields) => {
    //     enemyShips.forEach(ship => {
    //         ship.fields.forEach(field => {
    //             fields[field.y][field.x] = ship.sunken ? 2 : 1
    //         })
    //     })
    //     playerMisses.forEach(field => {
    //         fields[field.y][field.x] = 3
    //     });
    // }
    // const generatePlayerFields = (fields) => {
    //     playerShips.forEach(ship => {
    //         ship.fields.forEach(field => {
    //             fields[field.pos.y][field.pos.x] = ship.sunken ? 3 : field.hit ? 2 : 1
    //         })
    //     })
    //     enemyMisses.forEach(field => {
    //         fields[field.y][field.x] = 4
    //     })
    // }
    // const getEnemyNickname = () => {
    //     for (let i = 0; i < players.length; i++) {
    //         if (players[i].id !== online.getUserId())
    //             return players[i].nickname
    //     }
    //
    // }

    return (
        <div className={styles.game}>
            <div style={{width: "50%"}}>

                {/*<Board boardStyle={boardStyles.seaBoard} generateFields={generatePlayerFields}*/}
                {/*       fieldType={fieldStyles.seaField}*/}
                {/*       fieldStyles={playerFieldStyle}*/}
                {/*       isFieldDisabled={() => true}*/}
                {/*       additionalStyle={{backgroundColor: "#2777ee", border: "solid 1em #2777ee"}}/></div>*/}
                <Board fields={playerFields} handleFieldClick={handleConsoleFieldClick} boardInfo={BoardFactory.getSeaBoard()} />
            </div>
            <div style={{width: "50%"}}>
                <ShipPanel forfeit={forfeit}>
                    <InfoPanel info={infoPanelContent}></InfoPanel>
                    {/*<Board generateFields={generateEnemyFields} selectedFieldStyle={fieldStyles.selectedConsoleField}*/}
                    {/*       boardStyle={boardStyles.enemyBoard}*/}
                    {/*       fieldType={fieldStyles.consoleField}*/}
                    {/*       fieldStyles={enemyFieldStyle} isFieldDisabled={() => shootingPos !== null}*/}
                    {/*       handleFieldClick={handleConsoleFieldClick} disabled={!pickingField} shootingPos={shootingPos}*/}
                    {/*       additionalStyle={pickingField ? {borderColor: "lime"} : {}}/>*/}
                    <Board boardInfo={BoardFactory.getConsoleBoard(playerTurn)} handleFieldClick={handleConsoleFieldClick} fields={enemyFields}/>
                </ShipPanel>
            </div>
            {startingScreen&&winner===null ? <StartingScreen players={players} startingId={startingPlayer}></StartingScreen> : ""}
            {winner !== null ?
                <EndingScreen forfeited={forfeited} playerLeft={playerLeft} returnToRoom={returnToLobby} winner={winner}
                              showEnemyShips={handleShowEnemyShips}></EndingScreen> : ""}
            {/*{showEnemyShips ? <EnemyShips hideEnemyShips={hideEnemyShips} ships={endingEnemyShips}*/}
            {/*                              nickname={getEnemyNickname()}></EnemyShips> : ""}*/}
        </div>
    )
}


export default GameView