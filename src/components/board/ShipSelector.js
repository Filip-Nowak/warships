function ShipSelector(){
    return <div style={styles.container}>
        <ShipContainer shipsLeft={1} size={4}></ShipContainer>
        <ShipContainer shipsLeft={2} size={3}></ShipContainer>
        <ShipContainer shipsLeft={3} size={2}></ShipContainer>
        <ShipContainer shipsLeft={4} size={1}></ShipContainer>
    </div>
}
function ShipContainer({size,shipsLeft}){
    return <div style={styles.shipContainer}>
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
        height: "7em",
        marginLeft:"auto",
        marginRight:"auto",
        justifyContent:"space-between"
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