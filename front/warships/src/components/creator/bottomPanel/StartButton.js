import {useContext} from "react";
import styles from "./bottmPanel.module.css"
import BottomPanelContext from "../../context/BottomPanelContext";

function StartButton(){
    const {remainingShips,handleSubmitShips,ships}=useContext(BottomPanelContext)
    return <div className={styles.startButton} onClick={remainingShips===0?()=>handleSubmitShips(ships):null} style={remainingShips===0?{backgroundColor:"#1BC000",color:"#001801FF"}:{backgroundColor:"#001801FF",color:"#1BC000FF"}}>
        <div style={{fontSize:"2rem"}}>{remainingShips===0?"ready":remainingShips+" ships to go"}</div>
    </div>
}
export default StartButton