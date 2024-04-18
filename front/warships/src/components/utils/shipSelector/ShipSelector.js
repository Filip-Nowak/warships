import ShipContainer from "./ShipContainer";
import styles from "./shipSelector.module.css"
import {useContext} from "react";
import ShipSelectorContext from "../../context/ShipSelectorContext"
function ShipSelector(){
    const context=useContext(ShipSelectorContext);
    return <div className={styles.container} style={context.disabled?{opacity:"50%",border:"#001801FF solid 0.5em"}:{}}>
        {[4,3,2,1].map(size=>{
            return <ShipContainer shipsLeft={context.shipsLeft[4-size]} size={size}/>
        })}
    </div>
}



export default ShipSelector