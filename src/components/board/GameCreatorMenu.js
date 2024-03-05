import CreatorBoard from "./CreatorBoard";
import {useEffect, useRef, useState} from "react";
import ShipSelector from "./ShipSelector";
import BottomPanel from "./BottomPanel";

function GameCreatorMenu(){
    const [ships, setShips] = useState([])
    const [selectedShip, setSelectedShip] = useState(0)
    const [shipsLeft, setShipsLeft] = useState([1,2,3,4])
    const [deployingShip, setDeployingShip] = useState([])
    const [boardMode, setBoardMode] = useState(true)
    const addShip=()=>{
        setShips(prevState => (
            [...prevState,deployingShip]
        ))
        setShipsLeft((prevState)=>{
            return prevState.map((element,i)=>{
                if(i===4-selectedShip){
                    return element-1
                }
                return element
            })
        });
        setSelectedShip(0)
    }
    useEffect(() => {
        if(deployingShip.length===selectedShip&&selectedShip!==0){
            addShip()
            setDeployingShip([])

        }
    }, [deployingShip]);

    const pickField = (pos) => {
        setDeployingShip(prevState => (
            [...prevState, pos]
        ));
    }
    const changeBoardMode=(mode)=>{
        setBoardMode(mode)
        setSelectedShip(0);
    }
    const cancelShipDeploy=()=>{
        setDeployingShip([]);

    }
    const removeShip=(pos)=>{
        let shipId=-1
        console.log(ships)
        ships.forEach((ship,i)=>{
            ship.forEach(cord=>{
                if(pos.x===cord.x && pos.y===cord.y){
                    shipId=i;
                }
            })
        })
        if(shipId===-1){
            console.log("ship doesnt exist")
            return
        }
        console.log(ships[shipId])
        setShips(prevState => {
            prevState.splice(shipId,1)
        })
    }
    return <div style={styles.panel}>
        <PanelMessage msg={selectedShip===0?"select ship to deploy":"pick location for selected ship"}/>
        <div style={{display:"flex",marginTop:"1em"}}>
            <CreatorBoard removeShip={removeShip} pickField={pickField} disabled={!(!boardMode||(boardMode&&selectedShip!==0))} ships={ships} deployingShip={deployingShip} mode={boardMode}></CreatorBoard>
            <ShipSelector disabled={!boardMode || (boardMode && deployingShip.length!==0)} shipsLeft={shipsLeft} selectedShip={selectedShip} selectShip={setSelectedShip}></ShipSelector>
        </div>
        <BottomPanel changeMode={changeBoardMode} cancelButton={deployingShip.length!==0} cancelShip={cancelShipDeploy}></BottomPanel>
    </div>
}
function PanelMessage({msg}){
    return <div style={styles.message}>
        {msg}
    </div>
}
const styles={
    panel:{
        border:"1em #0C0400 solid",
        backgroundColor:"#001801",
        height:"50em",
        width:"50em",
        marginLeft:"auto",
        marginRight:"auto",
        marginTop:"5em",
        padding:"1em"
    },
    message:{
        fontSize:"250%",
    }

}


export default GameCreatorMenu