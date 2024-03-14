import ShipContainer from "./ShipContainer";
import styles from "./shipSelector.module.css"
function ShipSelector({selectedShip,selectShip,shipsLeft,disabled}){

    return <div className={styles.container} style={disabled?{opacity:"50%",border:"#001801FF solid 0.5em"}:{}}>
        <ShipContainer disabled={disabled} selected={selectedShip===4} select={selectShip} shipsLeft={shipsLeft[0]} size={4}></ShipContainer>
        <ShipContainer disabled={disabled} selected={selectedShip===3} select={selectShip} shipsLeft={shipsLeft[1]} size={3}></ShipContainer>
        <ShipContainer disabled={disabled} selected={selectedShip===2} select={selectShip} shipsLeft={shipsLeft[2]} size={2}></ShipContainer>
        <ShipContainer disabled={disabled} selected={selectedShip===1} select={selectShip} shipsLeft={shipsLeft[3]} size={1}></ShipContainer>
    </div>
}



export default ShipSelector