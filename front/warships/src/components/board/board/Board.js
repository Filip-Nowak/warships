import Field from "../field/Field";
import styles from "./boardStyle.module.css"
import {useState} from "react";
import getEmptyFields from "../../utils/getEmptyFields";

function Board({boardInfo,handleFieldClick}) {
    const [selectedField, setSelectedField] = useState({x: null, y: null})
    // const fields = getEmptyFields()
    // generateFields(fields)
    const {boardStyle,boardClassname,fields,fieldType,fieldClassnames,isFieldDisabled,selectedFieldStyle}=boardInfo;
    console.log(boardInfo)
    return <div style={boardStyle} className={styles.board + " " + boardClassname}>{fields.map((row, y) => {
        return row.map((fieldValue, x) => {
                return <Field
                    x={x}
                    y={y}
                    fieldType={fieldType}
                    handleClick={handleFieldClick}
                    style={fieldClassnames[fieldValue]}
                    isDisabled={isFieldDisabled}
                    selectedFieldStyle={selectedFieldStyle}
                    selected={selectedField.x === x && selectedField.y === y /*&& shootingPos===null*/}
                    selectField={setSelectedField}
                    value={fieldValue}
                    // shooting={shootingPos===null?false:(shootingPos.x===x&&shootingPos.y===y)}
                >
                </Field>
            })
        })}</div>
}

export default Board