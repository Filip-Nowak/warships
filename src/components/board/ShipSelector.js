function ShipSelector({selectedShip,selectShip}){
    return <div style={styles.container}>
        <ShipContainer selected={selectedShip===4} select={selectShip} shipsLeft={1} size={4}></ShipContainer>
        <ShipContainer selected={selectedShip===3} select={selectShip} shipsLeft={2} size={3}></ShipContainer>
        <ShipContainer selected={selectedShip===2} select={selectShip} shipsLeft={3} size={2}></ShipContainer>
        <ShipContainer selected={selectedShip===1} select={selectShip} shipsLeft={4} size={1}></ShipContainer>
    </div>
}
function ShipContainer({size,shipsLeft,selected,select}){
    const handleClick=()=>{
        select(size);
    }
    let style=styles.shipContainer;
    if(selected){
        style={...style,border:"0.25em solid #1BC000FF"}
    }
    return <div style={style} onClick={handleClick}>
        <div>{shipsLeft} left</div>
        <ShipIcon size={size}></ShipIcon>
    </div>
}
function ShipIcon({size}){
    return <div style={{display:"flex",alignItems:"center",justifyContent:"right"}}><div style={styles.shipCell}></div>{[...Array(size-1)].map(()=><><div style={styles.shipConnect}></div><div style={styles.shipCell}></div></>)}</div>
}
const styles={
    container:{
        width:"15em",
        height:"30em",
        marginLeft:"auto",
        marginRight:"auto",
    },
    shipContainer:{
        display:"flex",
        alignItems:"center",
        marginTop:"1em",
        width: "100%",
        height: "5em",
        marginLeft:"auto",
        marginRight:"auto",
        justifyContent:"space-between",
        border:"#001801 0.25em solid",
        padding:"0.3em"
    },
    shipCell:{
        width:"2em",
        height:"2em",
        backgroundColor:"#1BC000FF"
    },
    shipConnect:{
        width:"1em",
        height:"0.5em",
        backgroundColor:"#1BC000FF"
    }
}
export default ShipSelector