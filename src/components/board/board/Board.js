import Field from "../field/Field";
import styles from "./boardStyle.module.css"
function Board({handleFieldClick,fields,fieldStyles,boardStyle,isFieldDisabled, fieldType}){
    return <div className={styles.board+" "+boardStyle}>{fields.map((row,y)=>{
            return row.map((fieldValue,x)=>{
                console.log("chuj")
                return <Field
                    x={x}
                    y={y}
                    fieldType={fieldType}
                    handleClick={handleFieldClick}
                    style={fieldStyles[fieldValue]}
                    isDisabled={isFieldDisabled}
                >
                </Field>
            })
        })}</div>
}

export default Board