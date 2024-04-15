import BlinkingDots from "../../utils/BlinkingDots";
import styles from "./roomView.module.css"
import RoomPlayer from "./RoomPlayer";
import {useContext} from "react";
import OnlineContext from "../../context/OnlineContext";
function PlayersInRoom(){
    const onlineContext=useContext(OnlineContext)
    console.log(onlineContext.room.users)
    return <div className={styles.playersViewContainer}>
        <div className={styles.playersInRoomMsg}>players in room</div>
        <div className={styles.playersContainer}>
            <RoomPlayer player={onlineContext.room.users[0]}></RoomPlayer>
            <RoomPlayer player={onlineContext.room.users[1]}></RoomPlayer>
        </div>
    </div>
}
export default PlayersInRoom