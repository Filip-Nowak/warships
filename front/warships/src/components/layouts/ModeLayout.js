import Menu from "../Menu";
import ModeButton from "../ModeButton";

function ModeLayout({nickname,setMode}){
    return <Menu bgColor={"none"}>
        <ModeButton handleClick={setMode} modeName={"vs computer"}/>
        <ModeButton modeName={"multiplayer"}/>
    </Menu>
}
export default ModeLayout