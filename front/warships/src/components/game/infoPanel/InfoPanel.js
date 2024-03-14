import styles from "./infoPanel.module.css"
import BlinkingDots from "../../BlinkingDots";
function InfoPanel({info}){
    return <div className={styles.container}>
        {info.pickingField?(<div>pick field to shoot<BlinkingDots/></div>):"dupa"}
    </div>
}
export default InfoPanel;