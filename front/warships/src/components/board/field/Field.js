import styles from "./fieldStyle.module.css"

function Field({x, y, style, handleClick, isDisabled, fieldType, selectedFieldStyle,selectField,selected,value,boardDisabled}) {
    const onMouseOver = () => {
        if (!isDisabled(x, y,value)&&!boardDisabled) {
            selectField({x:x,y:y})
        }
    }
    const handleFieldClick = () => {
        if (!boardDisabled&&!isDisabled(x, y,value)) {
            handleClick({x:x,y:y});
        }
    }
    return <div onMouseOver={onMouseOver} className={styles.field + " " + fieldType + " " + style + " "+(selected&&!boardDisabled?selectedFieldStyle:"")} onClick={handleFieldClick}></div>
}

export default Field;