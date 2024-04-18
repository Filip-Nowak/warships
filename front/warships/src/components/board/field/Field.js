import styles from "./fieldStyle.module.css"
import {useEffect, useState} from "react";
import useTimer from "../../hooks/useTimer";

function Field({x, y, style, handleClick, isDisabled, fieldType, selectedFieldStyle,selectField,selected,value,boardDisabled,shooting}) {
    const [border, setBorder] = useState(false)
    const [timer, setTimer] = useState(0)// const handleCountdown=()=>{
    //     console.log("countdown")
    //     if(shooting){
    //         setBorder(prevState => !prevState)
    //         setCountdown(0.5)
    //     }
    // }
    // const [countdown,setCountdown]=useTimer(()=>{})
    // useEffect(() => {
    //     console.log("changed shooting")
    //     if(shooting)
    //         handleCountdown()
    // }, [shooting]);
    useEffect(() => {
        if(shooting)
        {
            setTimer(setInterval(()=>{
                setBorder(prevState =>{
                    return !prevState
                })
            },250))
        }
        else{
            setBorder(false)
            clearInterval(timer)
        }
    }, [shooting]);
    const onMouseOver = () => {
        if (!isDisabled({x:x,y:y},value)&&!boardDisabled) {
            selectField({x:x,y:y})
        }
    }
    const handleFieldClick = () => {
        if (!boardDisabled&&!isDisabled({x:x,y:y},value)) {
            handleClick({x:x,y:y});
        }
    }

    return <div style={border?{border:"0.25rem solid #1BC000"}:{}} onMouseOver={onMouseOver} className={styles.field + " " + fieldType + " " + style + " "+(selected&&!boardDisabled?selectedFieldStyle:"")} onClick={handleFieldClick}></div>
}

export default Field;