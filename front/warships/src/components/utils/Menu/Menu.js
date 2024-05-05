import styles from "./menu.module.css"
import BlinkingDots from "../blinkingDots/BlinkingDots";
import FullScreenInfo from "../loading/FullScreenInfo";
function Menu({containerStyle,children,className}){
    return <div className={styles.container+" "+className} style={containerStyle}>
        {children}
    </div>

}
export default Menu;