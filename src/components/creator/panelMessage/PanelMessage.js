import styles from "../creatorMenu.module.css"
function PanelMessage({msg,mode}){
    return <div className={styles.panelMessage+" "+(mode?"":styles.redPanelMessage)}>
        {msg}
    </div>
}
export default PanelMessage