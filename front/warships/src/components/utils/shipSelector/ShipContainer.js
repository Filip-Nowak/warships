import styles from "./shipSelector.module.css"
import ShipSelectorContext from "../../context/ShipSelectorContext"
import ShipIcon from "./ShipIcon";
import {useContext} from "react";
function ShipContainer({size,shipsLeft}){
    const context=useContext(ShipSelectorContext)
    const handleClick=()=>{
        if(!context.disabled)
        {
            if(shipsLeft!==0)
                context.selectShip(size);
        }
    }
    return <div className={styles.shipContainer} style={{...(context.selectedShip===size?{border:"0.25rem solid #1BC000FF",backgroundColor:"#1BC000FF",color:"#001801"}:null),...(shipsLeft===0?{opacity: "50%"}:null)}} onClick={handleClick}>
        <div>{shipsLeft} left</div>
        <ShipIcon selected={context.selectedShip===size} size={size}></ShipIcon>
    </div>
}
export default ShipContainer