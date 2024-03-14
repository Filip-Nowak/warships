import {useRef, useState} from "react";
import styles from"../styles/submitInput.module.css"
function SubmitInput({msg,handleButtonClick}){
    const username = useRef("");
    const [disabled,setDisabled]=useState(true)
    const handleClick=()=>{
       if(username.current!==""){
           handleButtonClick(username.current)
       }
    }
    const handleChange=(e)=>{
        username.current=e.target.value;
        if(username.current!==""){
            setDisabled(false)
        }else{
            setDisabled(true)
        }
    }
    return (
        <div className={styles.container}>
            <input autoFocus={true} maxLength={15} className={styles.input} onChange={handleChange}/>
            <button className={styles.button} disabled={disabled} onClick={handleClick}>{msg}</button>
        </div>
    )
}
export default SubmitInput