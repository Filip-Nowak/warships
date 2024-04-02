import GamePlayer from "./GamePlayer";
import styles from "./startingScreen.module.css"
function PlayersInfo({players,startingId}){
    console.log(startingId)
    return <div className={styles.playersInfo}>
        <GamePlayer nickname={players[0].nickname} starts={startingId===players[0].id}></GamePlayer>
        <div className={styles.vs}>
            vs
        </div>
        <GamePlayer nickname={players[1].nickname} starts={startingId===players[1].id}></GamePlayer>
    </div>
}export default PlayersInfo