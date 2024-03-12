import styles from "./bottmPanel.module.css"
import CancelButton from "./CancelButton";
import DefaultPanel from "./DefaultPanel";
function BottomPanel({showCancelButton,cancelShipDeploy,changeMode,remainingShips}) {
    return <div className={styles.container}>
        {showCancelButton ? <CancelButton handleClick={cancelShipDeploy}></CancelButton> :
        <DefaultPanel remainingShips={remainingShips} changeMode={changeMode}></DefaultPanel>}
    </div>
}




export default BottomPanel