import Board from "../../board/board/Board";
import fieldStyles from "../../board/field/fieldStyle.module.css"
import boardStyles from "../../board/board/boardStyle.module.css"
import styles from "./gameStyle.module.css"
import ShipPanel from "../shipPanel/ShipPanel";
import {useContext, useEffect, useState} from "react";
import Bot from "../../../bot/Bot";
import shipPanel from "../shipPanel/ShipPanel";
import InfoPanel from "../infoPanel/InfoPanel";
import getEmptyFields from "../../utils/getEmptyFields";
import GameContext from "../../context/gameContext";
import StartingScreen from "../startingScreen/StartingScreen";
import online from "../../../http/Online";
import EndingScreen from "../endingScreen/EndingScreen";

function GameView({playerShips,enemyShips,playerMisses,enemyMisses,infoPanelContent,handleConsoleFieldClick,startingScreen,players,startingPlayer,countdown,playerTurn,shootingPos,winner,returnToLobby}) {
    let playerFieldStyle = [
        fieldStyles.seaField,
        fieldStyles.ship,
        fieldStyles.hit,
        fieldStyles.sunken,
        fieldStyles.enemyMissed
    ]
    let enemyFieldStyle = [
        fieldStyles.consoleField,
        fieldStyles.consoleHit,
        fieldStyles.consoleSunken,
        fieldStyles.consoleMissed

    ]

    const generateEnemyFields=(fields)=>{
        enemyShips.forEach(ship=>{
            ship.fields.forEach(field=>{
                fields[field.y][field.x]=ship.sunken?2:1
            })
        })
        playerMisses.forEach(field=>{
            fields[field.y][field.x]=3
        });
    }
    const generatePlayerFields=(fields)=>{
        playerShips.forEach(ship=>{
            ship.fields.forEach(field=>{
                fields[field.pos.y][field.pos.x]=ship.sunken?3:field.hit?2:1
            })
        })
        enemyMisses.forEach(field=>{
            fields[field.y][field.x]=4
        })
    }
    return (
        <div className={styles.game}>
            <div style={{width: "50%"}}>

                <Board boardStyle={boardStyles.seaBoard} generateFields={generatePlayerFields} fieldType={fieldStyles.seaField}
                       fieldStyles={playerFieldStyle}
                       isFieldDisabled={() => true} additionalStyle={{backgroundColor:"#2777ee",border:"solid 1em #2777ee"}}/></div>
            <div style={{width: "50%"}}>
                <ShipPanel>
                    <InfoPanel info={infoPanelContent}></InfoPanel>
                    <Board generateFields={generateEnemyFields} selectedFieldStyle={fieldStyles.selectedConsoleField} boardStyle={boardStyles.enemyBoard}
                           fieldType={fieldStyles.consoleField}
                           fieldStyles={enemyFieldStyle} isFieldDisabled={() => false}
                           handleFieldClick={handleConsoleFieldClick} disabled={!playerTurn || shootingPos!==null} shootingPos={shootingPos}/>
                </ShipPanel>
            </div>
            {startingScreen?<StartingScreen players={players} startingId={startingPlayer} countdown={countdown}></StartingScreen>:""}
            {winner!==null?<EndingScreen returnToRoom={returnToLobby} winner={winner}></EndingScreen>:""}
        </div>
    )
}


export default GameView