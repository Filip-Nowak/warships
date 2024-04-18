import getEmptyFields from "../getEmptyFields";
import checkField from "../checkField";
import fieldStyles from "../../board/field/fieldStyle.module.css";
import boardStyles from "../../board/board/boardStyle.module.css";

class BoardFactory {
    getCreatorBoard = ( disabled, removeMode, deployingShip) => {
        const board = {}
        // const fields = getEmptyFields()
        // ships.forEach(ship => {
        //     ship.fields.forEach(field => {
        //             fields[field.pos.y][field.pos.x] = 1;
        //             for (let i = -1; i < 2; i++) {
        //                 for (let j = -1; j < 2; j++) {
        //                     if (checkField(field.pos.x + i, field.pos.y + j) && fields[field.pos.y + j][field.pos.x + i] !== 1) {
        //                         fields[j + field.pos.y][i + field.pos.x] = 4
        //                     }
        //                 }
        //             }
        //         }
        //     )
        // })
        // if (deployingShip.length === 1) {
        //     const x = deployingShip[0].x
        //     const y = deployingShip[0].y
        //
        //     fields[y][x] = 2;
        //     if (checkField(x + 1, y) && fields[y][x + 1] === 0)
        //         fields[y][x + 1] =3
        //     if (checkField(x - 1, y) && fields[y][x - 1] === 0)
        //         fields[y][x - 1] = 3
        //     if (checkField(x, y + 1) && fields[y + 1][x] === 0)
        //         fields[y + 1][x] = 3
        //     if (checkField(x, y - 1) && fields[y - 1][x] === 0)
        //         fields[y - 1][x] = 3
        //
        // } else {
        //     deployingShip.forEach(field => {
        //         fields[field.y][field.x] = 2
        //
        //     })
        //     deployingShip.forEach(field => {
        //         let counter = 0;
        //         let pos;
        //         if(checkField(field.x+1,field.y) && fields[field.y][field.x+1]===2){
        //             counter++;
        //             pos={x:field.x+1,y:field.y}
        //         }
        //         if(checkField(field.x-1,field.y) && fields[field.y][field.x-1]===2){
        //             counter++;
        //             pos={x:field.x-1,y:field.y}
        //
        //         }
        //         if(checkField(field.x,field.y+1) && fields[field.y+1][field.x]===2){
        //             counter++;
        //             pos={x:field.x,y:field.y+1}
        //
        //         }
        //         if(checkField(field.x,field.y-1) && fields[field.y-1][field.x]===2){
        //             counter++;
        //             pos={x:field.x,y:field.y-1}
        //
        //         }
        //         if(counter===1){
        //             const x=field.x+field.x-pos.x
        //             const y=field.y+field.y-pos.y
        //             if(checkField(x,y) && fields[y][x]===0)
        //                 fields[y][x]=3
        //         }
        //     })
        // }
        // board.fields = fields;
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
}

const boardFactory = new BoardFactory()
export default boardFactory