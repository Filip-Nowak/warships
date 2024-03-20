import BlinkingDots from "../../utils/BlinkingDots";
import styles from "./roomView.module.css"
import Player from "./Player";
function PlayersInRoom({players}){
    console.log(players[0])
    return <div className={styles.playersViewContainer}>
        <div className={styles.playersInRoomMsg}>players in room</div>
        <div className={styles.playersContainer}>
            <Player player={players[0]}></Player>
            <Player player={players[1]}></Player>
        </div>
    </div>
}
export default PlayersInRoom