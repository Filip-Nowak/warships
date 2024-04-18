import styles from "../creatorMenu.module.css"
import Timer from "../../utils/timer/Timer";

function TopPanel({msg, mode, time, disabled}) {
    return <div style={{display: "flex",justifyContent:"space-between"}}>
        <div className={styles.panelMessage + " " + (mode ? "" : styles.redPanelMessage)}>
            {msg}
        </div>
        <Timer time={time} disabled={disabled} dangerZone={15} style={{width:"15%",fontSize:"2.5rem"}}/></div>
}

export default TopPanel