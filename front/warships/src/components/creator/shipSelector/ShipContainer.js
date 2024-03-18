import styles from "./shipSelector.module.css"
import ShipIcon from "./ShipIcon";
function ShipContainer({size,shipsLeft,selected,select,disabled}){
    const handleClick=()=>{
        if(!disabled)
        {
            if(shipsLeft!==0)
                select(size);
        }
    }
    return <div className={styles.shipContainer} style={{...(selected?{border:"0.25rem solid #1BC000FF",backgroundColor:"#1BC000FF",color:"#001801"}:null),...(shipsLeft===0?{opacity: "50%"}:null)}} onClick={handleClick}>
        <div>{shipsLeft} left</div>
        <ShipIcon selected={selected} size={size}></ShipIcon>
    </div>
}
export default ShipContainer