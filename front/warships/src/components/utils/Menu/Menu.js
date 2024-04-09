import styles from "./menu.module.css"
import BlinkingDots from "../BlinkingDots";
import FullScreenInfo from "../loading/FullScreenInfo";
function Menu({containerStyle,fetching=false,children,className}){
    return <div className={styles.container+" "+className} style={containerStyle}>
        {children}
        {fetching?<FullScreenInfo loading={true}>loading</FullScreenInfo>:"" }
    </div>

}
export default Menu;