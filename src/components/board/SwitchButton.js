import {useState} from "react";

function SwitchButton({leftMsg,rightMsg,handleSwitch,size={width:"10em",height:"3em"}}){
    const [selected, setSelected] = useState(true)
    const onClick=()=>{
        handleSwitch(!selected)
        setSelected(prevState => !prevState)
    }
    return <div style={{...styles.container, height: size.height,width: size.width}}>
        <Button selected={selected} handleClick={onClick} msg={leftMsg}></Button>
        <Button selected={!selected} handleClick={onClick} msg={rightMsg}></Button>
    </div>
}
function Button({selected,handleClick,msg}){
    let style=styles.btn;
    if(selected){
        style={...style,...styles.selected}
    }else{
        style={...style,...styles.notSelected}
    }
    return <div style={{...styles.btn,...style}} onClick={!selected?handleClick:null}><div>{msg}</div></div>
}

const styles={
    container:{
        display:"flex"
    },
    btn:{
        width:"100%",
        display: "flex",
        alignItems:"center",
        justifyContent:"center"

    },
    selected:{
        backgroundColor:"#1BC000FF",
        color:"#001801FF",
    },
    notSelected:{
        color:"#1BC000FF"
    }
}
export default SwitchButton