import styles from "./fullScreenInfo.module.css";
import BlinkingDots from "../BlinkingDots";

function FullScreenInfo({children,loading}){
    return <div className={styles.absoluteContainer}>
        <div className={styles.absoluteChild}>{children}{loading?<BlinkingDots blinkSpeed={100}></BlinkingDots>:""}</div>
    </div>
}

export default FullScreenInfo