import getEmptyFields from "../getEmptyFields";
import checkField from "../checkField";
import fieldStyles from "../../board/field/fieldStyle.module.css";
import boardStyles from "../../board/board/boardStyle.module.css";

class BoardFactory {
    getCreatorBoard = ( disabled, removeMode, deployingShip) => {
        const board = {}
        const isFieldDisabled =
            disabled ?
                (pos,value) => true
                :
                removeMode ?
                    (pos,value) => {
                        return value !== 1
                    }
                    :
                    deployingShip.length === 0 ?
                        (pos,value) => {
                            return value !== 0
                        }
                        :
                        (pos,value) => {
                            return value !== 3
                        }

        board.isFieldDisabled = isFieldDisabled
        board.fieldType = fieldStyles.creatorField
        board.fieldClassnames = [
            "",
            (!removeMode ? fieldStyles.creatorPicked : fieldStyles.creatorRemovable),
            fieldStyles.creatorDeploy,
            fieldStyles.creatorPossible,
            (!removeMode ? fieldStyles.creatorForbidden : "")]
        board.boardClassname = boardStyles.creatorBoard;
        board.selectedFieldStyle = !disabled ? removeMode ? "" : fieldStyles.creatorSelected : ""
        board.boardStyle = removeMode ?
            {borderColor: "red"}
            :
            disabled ? {
                opacity: "50%",
                borderColor: "#001801"
            } : {}
        console.log(board)
        return board;
    }
    getSeaBoard =()=>{
        const board={}
        board.isFieldDisabled(()=>true)
        board.fieldType=fieldStyles.seaField
        board.fieldClassnames =[
            fieldStyles.seaField,
            fieldStyles.ship,
            fieldStyles.hit,
            fieldStyles.sunken,
            fieldStyles.enemyMissed
        ]
        board.boardClassname=boardStyles.seaBoard
        board.selectedFieldStyle=""
        board.boardStyle={backgroundColor: "#2777ee", border: "solid 1em #2777ee"}
    }
}

const boardFactory = new BoardFactory()
export default boardFactory