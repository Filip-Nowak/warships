import styles from "./timer.module.css"
function Timer({time,style={},disabled,dangerZone}){
    let msg=+Math.floor(time/60)+" : ";
    if(time%60<10)
        msg+="0"
    msg+=time%60
    return <div className={styles.timer} style={{...style,...disabled?{opacity:"20%"}:{...time<=dangerZone?{color:"red"}:{}}}}>{disabled?"0 : 00":msg}</div>
}
export default Timer