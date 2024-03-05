import ShipSelector from "./ShipSelector";
import SwitchButton from "./SwitchButton";

function BottomPanel({cancelButton,cancelShip,changeMode}) {
    return <div style={styles.container}>
        {cancelButton ? <CancelButton handleClick={cancelShip}></CancelButton> :
        <DefaultPanel changeMode={changeMode}></DefaultPanel>}
    </div>
}
function CancelButton({handleClick}){
    return <div style={styles.cancelBtn} onClick={handleClick}><div style={{fontSize:"200%"}} >cancel</div></div>
}
function DefaultPanel({changeMode}){
    return <div style={styles.defaultPanel}>
        <SwitchButton handleSwitch={changeMode} leftMsg={"add"} rightMsg={"remove"} size={{width:"20em",height:"5em"}}></SwitchButton>
    </div>
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
        marginTop: "3em",
        width:"100%",
        height:"10em"
    }
}
export default BottomPanel