import {useState} from "react";
import styles from "./switchButton.module.css"
function SwitchButton({leftMsg,rightMsg,handleSwitch,containerStyle}){
    const [selected, setSelected] = useState(true)
    const onClick=()=>{
        handleSwitch(!selected)
        setSelected(prevState => !prevState)
    }
    return <div className={styles.container} style={{display:"flex",...containerStyle}} >
        <Button selected={selected} handleClick={onClick} msg={leftMsg}></Button>
        <Button selected={!selected} handleClick={onClick} msg={rightMsg}></Button>
    </div>
}
function Button({selected,handleClick,msg}){
    return <div className={styles.btn+" "+(selected?styles.selected:styles.notSelected)} onClick={!selected?handleClick:null}><div>{msg}</div></div>
}


export default SwitchButton