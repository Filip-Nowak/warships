import ShipSelector from "./ShipSelector";
import SwitchButton from "../utils/SwitchButton";
import {renderToStaticMarkup} from "react-dom/server";
import {useContext} from "react";
import GameContext from "../context/gameContext";

function BottomPanel({cancelButton,cancelShip,changeMode,remainingShips}) {
    return <div style={styles.container}>
        {cancelButton ? <CancelButton handleClick={cancelShip}></CancelButton> :
        <DefaultPanel remainingShips={remainingShips} changeMode={changeMode}></DefaultPanel>}
    </div>
}
function CancelButton({handleClick}){
    return <div style={styles.cancelBtn} onClick={handleClick}><div style={{fontSize:"200%"}} >cancel</div></div>
}
function DefaultPanel({changeMode,remainingShips}){
    return <div style={styles.defaultPanel}>
        <SwitchButton handleSwitch={changeMode} leftMsg={"add"} rightMsg={"remove"} size={{width:"20em",height:"5em"}}></SwitchButton>
        <StartButton remainingShips={remainingShips}></StartButton>
    </div>
}
function StartButton({remainingShips}){
    const value=useContext(GameContext);
    return <div onClick={remainingShips===0?()=>value.launchGame(value.createdShips):null} style={remainingShips===0?{backgroundColor:"#1BC000",color:"#001801FF",...styles.startButton}:{...styles.startButton,backgroundColor:"#001801FF",color:"#1BC000FF"}}> <div style={{fontSize:"200%"}}>{remainingShips===0?"ready":remainingShips+" ships to go"}</div></div>
}

const styles = {
    container: {
        width: "100%",
        marginTop: "1em",
        height: "13em"
    },
    cancelBtn: {
        border:"red solid 1em",
        color:"red",
        width: "80%",
        height: "10em",
        marginLeft:"auto",
        marginRight:"auto",
        display:"flex",
        alignItems:"center",
        justifyContent:"center"
    },
    defaultPanel:{
        display: "flex",
        marginTop: "3em",
        width:"100%",
        height:"10em",
        justifyContent:"space-between",

    },
    startButton:{
        marginRight: "3em",
        width:"30%",
        height:"70%",
        display:'flex',
        justifyContent:"center",
        alignItems:"center"
    }
}
export default BottomPanel