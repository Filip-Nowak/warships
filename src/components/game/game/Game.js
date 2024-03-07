import Board from "../../board/board/Board";
import fieldStyles from "../../board/field/fieldStyle.module.css"
import boardStyles from "../../board/board/boardStyle.module.css"
import styles from "./gameStyle.module.css"
import ShipPanel from "../shipPanel/ShipPanel";
import {useRef, useState} from "react";

function Game() {
    let userFields = getEmptyFields()
    const [enemyFields, setEnemyFields] = useState(getEmptyFields())
    const getEnemyField = (pos) => {
        return enemyFields[pos.y][pos.x]
    }
    const setEnemyField = (pos, value) => {
        setEnemyFields((prevState) => {
                prevState[pos.y][pos.x] = value;
                return prevState;
            }
        )
    }
    const [playerTurn, setPlayerTurn] = useState(true)
    let playerFieldStyle = [
        fieldStyles.seaField,
        fieldStyles.ship,
        fieldStyles.hit,
        fieldStyles.sunken
    ]
    let enemyFieldStyle = [
        fieldStyles.consoleField,
        fieldStyles.consoleHit,
        fieldStyles.consoleSunken,
        fieldStyles.consoleMissed

    ]

    const handleConsoleFieldClick = (x, y) => {
        console.log("dupa")
        if (playerTurn) {
            setEnemyField({x:x,y:y},1)
        }
        console.log(enemyFields)
    }

    return (
        <div className={styles.game}>
            <div style={{width: "50%"}}>

                <Board boardStyle={boardStyles.seaBoard} fields={userFields} fieldType={fieldStyles.seaField}
                       fieldStyles={playerFieldStyle}
                       isFieldDisabled={() => true}/></div>
            <div style={{width: "50%"}}>
                <ShipPanel>
                    <Board boardStyle={boardStyles.enemyBoard} fields={enemyFields} fieldType={fieldStyles.consoleField}
                           fieldStyles={enemyFieldStyle} isFieldDisabled={() => false} handleFieldClick={handleConsoleFieldClick}/>
                </ShipPanel>
            </div>
        </div>
    )
}

const getEmptyFields = () => {
    return [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 2, 0, 3, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
}
export default Game