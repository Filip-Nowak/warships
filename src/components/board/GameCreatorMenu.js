import CreatorBoard from "./CreatorBoard";
import {useState} from "react";

function GameCreatorMenu(){
    const [fields, setFields] = useState(getEmptyFields)
    return <div style={styles.panel}>
        <PanelMessage msg={"pick position for your ships"}/>
        <div>
            <CreatorBoard fields={fields}></CreatorBoard>
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
const getEmptyFields=()=>{
    return [
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0]
    ]
}

export default GameCreatorMenu