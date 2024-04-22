import Field from "../field/Field";
import styles from "./boardStyle.module.css"
import {useState} from "react";
import getEmptyFields from "../../utils/getEmptyFields";
import BlinkingField from "../field/BlinkingField";

function Board({boardInfo, handleFieldClick=()=>{}, fields}) {
    const [selectedField, setSelectedField] = useState({x: null, y: null})
    const {boardStyle, boardClassname, fieldType, fieldClassnames, isFieldDisabled, selectedFieldStyle} = boardInfo;
    return <div style={boardStyle} className={styles.board + " " + boardClassname}>{fields.map((row, y) => {
        return row.map((fieldValue, x) => {
            if (fieldValue >= 10) {
                return <BlinkingField
                    x={x}
                    y={y}
                    fieldType={fieldType}
                    handleClick={handleFieldClick}
                    classname={fieldClassnames[fieldValue]}
                    isDisabled={isFieldDisabled}
                    selectedFieldStyle={selectedFieldStyle}
                    selected={selectedField.x === x && selectedField.y === y /*&& shootingPos===null*/}
                    selectField={setSelectedField}
                    value={fieldValue-10}/>

            }
            return <Field
                x={x}
                y={y}
                fieldType={fieldType}
                handleClick={handleFieldClick}
                classname={fieldClassnames[fieldValue]}
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