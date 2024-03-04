import CreatorBoard from "./CreatorBoard";
import {useRef, useState} from "react";
import ShipSelector from "./ShipSelector";

function GameCreatorMenu(){
    const [ships, setShips] = useState([])
    const [selectedShip, setSelectedShip] = useState(0)
    const [shipsLeft, setShipsLeft] = useState([1,2,3,4])
    const addShip=(ship)=>{
        setShips(prevState => (
            [...prevState,ship]
        ))
        console.log(selectedShip)
        setShipsLeft((prevState)=>{
            return prevState.map((element,i)=>{
                if(i===4-selectedShip){
                    console.log("Xd")
                    return element-1
                }
                return element
            })
        });
        setSelectedShip(0)
    }
    console.log(shipsLeft)
    return <div style={styles.panel}>
        <PanelMessage msg={selectedShip===0?"select ship to deploy":"pick location for selected ship"}/>
        <div style={{display:"flex",marginTop:"1em"}}>
            <CreatorBoard deployingShipNumber={selectedShip} disabled={selectedShip===0} ships={ships} addShip={addShip}></CreatorBoard>
            <ShipSelector shipsLeft={shipsLeft} selectedShip={selectedShip} selectShip={setSelectedShip}></ShipSelector>
        </div>
        <div>

        </div>
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