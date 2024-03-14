import styles from "./fieldStyle.module.css"

function Field({x, y, style, handleClick, isDisabled, fieldType, selectedFieldStyle,selectField,selected,value}) {
    const onMouseOver = () => {
        if (!isDisabled(x, y,value)) {
            selectField({x:x,y:y})
        }
    }
    const handleFieldClick = () => {
        if (!isDisabled(x, y,value)) {
            handleClick(x, y);
        }
    }
    return <div onMouseOver={onMouseOver} className={styles.field + " " + fieldType + " " + style + " "+(selected?selectedFieldStyle:"")} onClick={handleFieldClick}></div>
}

export default Field;