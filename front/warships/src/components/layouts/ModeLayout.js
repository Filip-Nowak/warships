import Menu from "../Menu";
import ModeButton from "../ModeButton";
import {useContext} from "react";
import GameContext from "../context/gameContext";

function ModeLayout({nickname,setMode}){
    const context=useContext(GameContext)
    return <Menu bgColor={"none"}>
        <ModeButton handleClick={()=>context.changeView("gameCreator")} modeName={"vs computer"}/>
        <ModeButton modeName={"multiplayer"} handleClick={()=>context.changeView("multiplayer")}/>
    </Menu>
}
export default ModeLayout