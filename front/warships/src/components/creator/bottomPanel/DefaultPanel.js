import SwitchButton from "../../utils/switchButton/SwitchButton";
import styles from "./bottmPanel.module.css";
import StartButton from "./StartButton";
import {useContext} from "react";
import BottomPanelContext from "../../context/BottomPanelContext";

function DefaultPanel(){
    const context= useContext(BottomPanelContext)
    return <div className={styles.defaultPanel}>
        <SwitchButton handleSwitch={context.changeMode} leftMsg={"add"} rightMsg={"remove"} containerStyle={{width:"20rem",height:"5rem"}}></SwitchButton>
        <StartButton ></StartButton>
    </div>
}
export default DefaultPanel