import GamePlayer from "./GamePlayer";
import styles from "./startingScreen.module.css"
function PlayersInfo({players,startingId}){
    console.log(startingId)
    return <div className={styles.playersInfo}>
        <GamePlayer nickname={players[0]} starts={startingId===0}></GamePlayer>
        <div className={styles.vs}>
            vs
        </div>
        <GamePlayer nickname={players[1]} starts={startingId===1}></GamePlayer>
    </div>
}export default PlayersInfo