import styles from "../creatorMenu.module.css"
import Timer from "../../utils/timer/Timer";
import useTimer from "../../hooks/useTimer";
import {useEffect} from "react";

function TopPanel({msg, mode, disabled, handleSubmitShips, online}) {
    const [time, setTime] = useTimer(handleSubmitShips);
    useEffect(() => {
        if (online) {
            setTime(60)
        }
    }, []);
    return <div style={{display: "flex", justifyContent: "space-between"}}>
        <div className={styles.panelMessage + " " + (mode ? "" : styles.redPanelMessage)}>
            {msg}
        </div>
        <Timer time={time} disabled={disabled} dangerZone={15} style={{width: "15%", fontSize: "2.5rem"}}/></div>
}

export default TopPanel