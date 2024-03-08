import Field from "../field/Field";
import styles from "./boardStyle.module.css"
import {useState} from "react";
function Board({handleFieldClick,fields,fieldStyles,boardStyle,isFieldDisabled, fieldType,selectedFieldStyle}){
    const [selectedField, setSelectedField] = useState({x:null,y:null})
    return <div className={styles.board+" "+boardStyle}>{fields.map((row,y)=>{
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
                >
                </Field>
            })
        })}</div>
}

export default Board