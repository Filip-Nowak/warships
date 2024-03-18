import styles from "./bottmPanel.module.css"
function CancelButton({handleClick}){
    return <div className={styles.cancelBtn} onClick={handleClick}><div style={{fontSize:"2rem"}} >cancel</div></div>
}
export default CancelButton