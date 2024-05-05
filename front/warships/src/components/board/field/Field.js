import styles from "./fieldStyle.module.css"
import {useEffect, useState} from "react";
import useTimer from "../../hooks/useTimer";

function Field({x, y, classname, handleClick, isDisabled, fieldType, selectedFieldStyle,selectField,selected,value,style}) {
    const onMouseOver = () => {
        if (!isDisabled({x:x,y:y},value)) {
            selectField({x:x,y:y})
        }
    }
    const handleFieldClick = () => {
        if (!isDisabled({x:x,y:y},value)) {
            handleClick({x:x,y:y});
        }
    }

    return <div style={style} onMouseOver={onMouseOver} className={styles.field + " " + fieldType + " " + classname + " "+(selected?selectedFieldStyle:"")} onClick={handleFieldClick}></div>
}

export default Field;