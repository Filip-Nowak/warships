import styles from "./roomView.module.css"
import BlinkingDots from "../../utils/BlinkingDots";

function RoomPlayer({player}) {
    return <div className={styles.player}>{player !== undefined ?
        <>
            <div>{player.nickname}</div>
            <div style={player.ready?{}:{opacity:"50%"}}>ready</div>
        </>
        :
        <div style={{color: "#3c6c02"}}>waiting<BlinkingDots></BlinkingDots></div>}</div>
}

export default RoomPlayer