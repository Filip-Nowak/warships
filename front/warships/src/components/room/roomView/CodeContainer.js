import styles from "./roomView.module.css"
function CodeContainer({code}){
    return <div className={styles.codeContainer}>
        <div className={styles.codeMsg}>your room code</div>
        <div className={styles.code}>{code}</div>
    </div>
}
export default CodeContainer