import {useContext} from "react";
import GameContext from "../../context/gameContext";
import styles from "./bottmPanel.module.css"

function StartButton({remainingShips}){
    const value=useContext(GameContext);
    return <div className={styles.startButton} onClick={remainingShips===0?()=>value.launchGame(value.createdShips):null} style={remainingShips===0?{backgroundColor:"#1BC000",color:"#001801FF"}:{backgroundColor:"#001801FF",color:"#1BC000FF"}}>
        <div style={{fontSize:"200%"}}>{remainingShips===0?"ready":remainingShips+" ships to go"}</div>
    </div>
}
export default StartButton