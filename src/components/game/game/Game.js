import Board from "../../board/board/Board";
import fieldStyles from "../../board/field/fieldStyle.module.css"
import boardStyles from "../../board/board/boardStyle.module.css"
import styles from "./gameStyle.module.css"
import ShipPanel from "../shipPanel/ShipPanel";

function Game() {
    let userFields = getEmptyFields()
    let enemyFields = getEmptyFields()
    let playerFieldStyle = [
        fieldStyles.seaField,
        fieldStyles.ship,
        fieldStyles.hit,
        fieldStyles.sunken
    ]
    let enemyFieldStyle=[
        fieldStyles.consoleField,
        fieldStyles.consoleHit,
        fieldStyles.consoleSunken,
        fieldStyles.consoleMissed

    ]
    return (
        <div className={styles.game}>
            <div style={{width:"100%"}}>
            <Board boardStyle={boardStyles.seaBoard} fields={userFields} fieldType={fieldStyles.seaField} fieldStyles={playerFieldStyle}
                   isFieldDisabled={() => true}/></div>
            <div style={{width:"100%"}}>
                <ShipPanel>
            <Board boardStyle={boardStyles.enemyBoard} fields={enemyFields} fieldType={fieldStyles.consoleField} fieldStyles={enemyFieldStyle} isFieldDisabled={() => true}/>
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