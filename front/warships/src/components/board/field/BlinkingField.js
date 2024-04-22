import Field from "./Field";
import {useEffect, useRef, useState} from "react";
import useTimer from "../../hooks/useTimer";

function BlinkingField({x,y,handleClick, isDisabled, fieldType, selectedFieldStyle,selectField,selected,value,boardDisabled,classname}){
    const [border, setBorder] = useState(true)
    const onTimeChange=()=>{
        console.log("dupa")
        setBorder(prevState => !prevState)
        setTime(0.3)
    }
    useEffect(() => {
        console.log("chuj")
        setTime(0.3)
    }, []);
    const [time,setTime]=useTimer(onTimeChange,300)
    const style = border?{border:"0.25rem solid #1BC000"}:{}
    return <div>
        <Field x={x}
               y={y}
               fieldType={fieldType}
               handleClick={handleClick}
               classname={classname}
               isDisabled={isDisabled}
               selectedFieldStyle={selectedFieldStyle}
               selected={selected}
               selectField={selectField}
               value={value}
                style={style}/>
    </div>
}
export default BlinkingField