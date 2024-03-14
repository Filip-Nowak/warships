import Field from "../field/Field";
import styles from "./boardStyle.module.css"
import {useState} from "react";
function Board({generateFields,handleFieldClick,fieldStyles,boardStyle,isFieldDisabled, fieldType,selectedFieldStyle,additionalStyle={}}){
    const [selectedField, setSelectedField] = useState({x:null,y:null})
    const fields=getEmptyFields()
    generateFields(fields)

    return <div style={additionalStyle} className={styles.board+" "+boardStyle}>{fields.map((row,y)=>{
            return row.map((fieldValue,x)=>{
                return <Field
                    x={x}
                    y={y}
                    fieldType={fieldType}
                    handleClick={handleFieldClick}
                    style={fieldStyles[fieldValue]}
                    isDisabled={isFieldDisabled}
                    selectedFieldStyle={selectedFieldStyle}
                    selected={selectedField.x===x&& selectedField.y===y}
                    selectField={setSelectedField}
                    value={fieldValue}
                >
                </Field>
            })
        })}</div>
}
const getEmptyFields = () => {
    return [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
}
export default Board