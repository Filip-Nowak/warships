import styles from "./infoPanel.module.css"
import BlinkingDots from "../../utils/BlinkingDots";
function InfoPanel({info}){
    return <div className={styles.container}>
        {info}
    </div>
}
export default InfoPanel;