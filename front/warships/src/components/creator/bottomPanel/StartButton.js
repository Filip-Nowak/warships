import {useContext} from "react";
import GameContext from "../../context/gameContext";
import styles from "./bottmPanel.module.css"
import CreatedShipsContext from "../../context/createdShipsContext";

function StartButton({remainingShips}){
    const gameContext=useContext(GameContext);
    const createdShipsContext=useContext(CreatedShipsContext);
    return <div className={styles.startButton} onClick={remainingShips===0?()=>gameContext.launchGame(createdShipsContext.ships):null} style={remainingShips===0?{backgroundColor:"#1BC000",color:"#001801FF"}:{backgroundColor:"#001801FF",color:"#1BC000FF"}}>
        <div style={{fontSize:"2rem"}}>{remainingShips===0?"ready":remainingShips+" ships to go"}</div>
    </div>
}
export default StartButton