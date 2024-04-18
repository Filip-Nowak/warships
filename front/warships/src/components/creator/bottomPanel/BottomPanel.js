import styles from "./bottmPanel.module.css"
import CancelButton from "./CancelButton";
import DefaultPanel from "./DefaultPanel";
import {useContext} from "react";
import BottomPanelContext from "../../context/BottomPanelContext";
function BottomPanel() {
    const context=useContext(BottomPanelContext)
    return <div className={styles.container}>
        {context.showCancelButton ? <CancelButton handleClick={context.cancelShipDeploy}></CancelButton> :
        <DefaultPanel></DefaultPanel>}
    </div>
}




export default BottomPanel