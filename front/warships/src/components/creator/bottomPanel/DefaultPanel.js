import SwitchButton from "../../utils/switchButton/SwitchButton";
import styles from "./bottmPanel.module.css";
import StartButton from "./StartButton";

function DefaultPanel({changeMode,remainingShips}){
    return <div className={styles.defaultPanel}>
        <SwitchButton handleSwitch={changeMode} leftMsg={"add"} rightMsg={"remove"} containerStyle={{width:"20em",height:"5em"}}></SwitchButton>
        <StartButton remainingShips={remainingShips}></StartButton>
    </div>
}
export default DefaultPanel