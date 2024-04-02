import BlinkingDots from "../../utils/BlinkingDots";
import styles from "./roomView.module.css"
import RoomPlayer from "./RoomPlayer";
function PlayersInRoom({players}){
    console.log(players[0])
    return <div className={styles.playersViewContainer}>
        <div className={styles.playersInRoomMsg}>players in room</div>
        <div className={styles.playersContainer}>
            <RoomPlayer player={players[0]}></RoomPlayer>
            <RoomPlayer player={players[1]}></RoomPlayer>
        </div>
    </div>
}
export default PlayersInRoom