import styles from "./menu.module.css"
import BlinkingDots from "../BlinkingDots";
import FullScreenInfo from "../loading/FullScreenInfo";
function Menu({containerStyle,fetching=false,children}){
    return <div className={styles.container} style={containerStyle}>
        {children}
        {fetching?<FullScreenInfo loading={true}>loading</FullScreenInfo>:"" }
    </div>

}
export default Menu;