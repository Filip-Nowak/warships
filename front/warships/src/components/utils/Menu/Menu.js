import styles from "./menu.module.css"
import BlinkingDots from "../BlinkingDots";
function Menu({containerStyle,fetching=false,children}){
    return <div className={styles.container} style={containerStyle}>
        {children}
        {fetching?<div className={styles.absoluteContainer}><div className={styles.absoluteChild}> loading<BlinkingDots blinkSpeed={100}></BlinkingDots> </div></div>:""}
    </div>
}
export default Menu;