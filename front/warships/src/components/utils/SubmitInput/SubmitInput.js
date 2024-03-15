import { useRef, useState} from "react";
import styles from "./submitInput.module.css"
function SubmitInput({msg,handleButtonClick,containerStyle}){
    const input=useRef()
    const [disabled,setDisabled]=useState(true)
    const handleClick=()=>{
        if(input.current.value!==""){
            handleButtonClick(input.current.value)
        }
    }
    const handleChange=(e)=>{
        input.current.value=e.target.value;
        if(input.current.value!==""){
            setDisabled(false)
        }else{
            setDisabled(true)
        }
    }
    return (
        <div className={styles.submitContainer}>
            <input ref={input} autoFocus={true} maxLength={15} className={styles.input} onChange={handleChange}/>
            <button className={styles.button} disabled={disabled} onClick={handleClick}>{msg}</button>
        </div>
    )
}
export default SubmitInput