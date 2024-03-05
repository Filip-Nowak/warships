function ShipSelector({selectedShip,selectShip,shipsLeft,disabled}){
    let style=styles.container;
    if(disabled){
        style={...style,opacity:"50%",border:"#001801FF solid 0.5em"}
    }
    return <div style={style}>
        <ShipContainer disabled={disabled} selected={selectedShip===4} select={selectShip} shipsLeft={shipsLeft[0]} size={4}></ShipContainer>
        <ShipContainer disabled={disabled} selected={selectedShip===3} select={selectShip} shipsLeft={shipsLeft[1]} size={3}></ShipContainer>
        <ShipContainer disabled={disabled} selected={selectedShip===2} select={selectShip} shipsLeft={shipsLeft[2]} size={2}></ShipContainer>
        <ShipContainer disabled={disabled} selected={selectedShip===1} select={selectShip} shipsLeft={shipsLeft[3]} size={1}></ShipContainer>
    </div>
}
function ShipContainer({size,shipsLeft,selected,select,disabled}){
    const handleClick=()=>{
        if(!disabled)
        {
            if(shipsLeft!==0)
                select(size);
        }
    }
    let style=styles.shipContainer;
    if(selected){
        style={...style,border:"0.25em solid #1BC000FF",backgroundColor:"#1BC000FF",color:"#001801"}
    }
    if(shipsLeft===0){
        style={...style,opacity:"50%"}
    }
    return <div style={style} onClick={handleClick}>
        <div>{shipsLeft} left</div>
        <ShipIcon selected={selected} size={size}></ShipIcon>
    </div>
}
function ShipIcon({size,selected}){
    let cellStyle=styles.shipCell;
    let connectStyle=styles.shipConnect;
    if(selected){
        cellStyle={...cellStyle,backgroundColor: "#001801"}
        connectStyle={...connectStyle,backgroundColor: "#001801"}
    }
    return <div style={{display:"flex",alignItems:"center",justifyContent:"right"}}><div style={cellStyle}></div>{[...Array(size-1)].map(()=><><div style={connectStyle}></div><div style={cellStyle}></div></>)}</div>
}
const styles={
    container:{
        border:"0.5em #1BC000FF solid",
        width:"15em",
        height:"30em",
        marginLeft:"auto",
        marginRight:"auto",
        padding: "0.5em"
    },
    shipContainer:{
        display:"flex",
        alignItems:"center",
        marginTop:"1em",
        width: "93%",
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
        width:"0.7em",
        height:"0.5em",
        backgroundColor:"#1BC000FF"
    }
}
export default ShipSelector