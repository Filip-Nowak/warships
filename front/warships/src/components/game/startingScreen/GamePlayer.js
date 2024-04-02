import styles from"./startingScreen.module.css"
function GamePlayer({nickname,starts}){
    return <div className={styles.player}><div>{nickname}</div>
        {starts?<div className={styles.starts}>starts</div>:""}
    </div>
}
export default GamePlayer