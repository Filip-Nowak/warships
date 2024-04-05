import Field from "../field/Field";
import styles from "./boardStyle.module.css"
import {useState} from "react";
import getEmptyFields from "../../utils/getEmptyFields";

function Board({
                   generateFields,
                   handleFieldClick,
                   fieldStyles,
                   boardStyle,
                   isFieldDisabled,
                   fieldType,
                   selectedFieldStyle,
                   additionalStyle = {},
                   disabled = false,
                    shootingPos=null
               }) {
    const [selectedField, setSelectedField] = useState({x: null, y: null})
    const fields = getEmptyFields()
    generateFields(fields)
    return <div style={{...additionalStyle,opacity:disabled?"50%":"100%"}} className={styles.board + " " + boardStyle}>{fields.map((row, y) => {
        return row.map((fieldValue, x) => {
                return <Field
                    x={x}
                    y={y}
                    fieldType={fieldType}
                    handleClick={handleFieldClick}
                    style={fieldStyles[fieldValue]}
                    isDisabled={isFieldDisabled}
                    selectedFieldStyle={selectedFieldStyle}
                    selected={selectedField.x === x && selectedField.y === y}
                    selectField={setSelectedField}
                    value={fieldValue}
                    boardDisabled={disabled}
                    shooting={shootingPos===null?false:(shootingPos.x===x&&shootingPos.y===y)}
                >
                </Field>
            })
        })}</div>
}

export default Board