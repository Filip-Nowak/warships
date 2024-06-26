import styles from "./infoPanel.module.css"
import BlinkingDots from "../../utils/blinkingDots/BlinkingDots";
function InfoPanel({info}){
    return <div className={styles.container}>
        {info.message}{info.loading?<BlinkingDots/>:""}
    </div>
}
export default InfoPanel;