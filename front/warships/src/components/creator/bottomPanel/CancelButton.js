import styles from "./bottmPanel.module.css"
function CancelButton({handleClick}){
    return <div className={styles.cancelBtn} onClick={handleClick}><div style={{fontSize:"200%"}} >cancel</div></div>
}
export default CancelButton