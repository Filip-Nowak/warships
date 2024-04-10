import styles from "./roomView.module.css"
import {useContext} from "react";
import OnlineContext from "../../context/OnlineContext";
function CodeContainer(){
    const onlineContext=useContext(OnlineContext)
    return <div className={styles.codeContainer}>
        <div className={styles.codeMsg}>your room code</div>
        <div className={styles.code}>{onlineContext.room.id}</div>
    </div>
}
export default CodeContainer