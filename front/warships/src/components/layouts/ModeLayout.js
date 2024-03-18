import Menu from "../utils/Menu/Menu";
import ModeButton from "../welcome/ModeButton";
import {useContext} from "react";
import GameContext from "../context/gameContext";

function ModeLayout({nickname,setMode}){
    const context=useContext(GameContext)
    return <Menu containerStyle={{backgroundColor:"#00000000",marginTop:"15rem",width:"50rem",display:"flex"}}>
        <ModeButton handleClick={()=>{context.changeView("gameCreator")}} modeName={"vs computer"}/>
        <ModeButton modeName={"multiplayer"} handleClick={()=>context.changeView("multiplayer")}/>
    </Menu>
}
export default ModeLayout