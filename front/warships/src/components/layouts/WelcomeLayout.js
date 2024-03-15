import Menu from "../utils/Menu/Menu"
import BlinkingDots from "../utils/BlinkingDots";
import SubmitInput from "../utils/SubmitInput/SubmitInput";
import {useContext} from "react";
import GameContext from "../context/gameContext";
function WelcomeLayout({handleButtonClick}){
    const context=useContext(GameContext);
    return <Menu containerStyle={{height:"20em",width:"50em",display:"block",marginTop:"10em", paddingTop:"3em"}}>
        <div  style={{
            fontSize: "2.5em",
            marginRight: "auto",
            marginLeft: "auto",
            width:"65%",
            display: "flex",
        }}>
            <span>Type in your nickname</span><BlinkingDots></BlinkingDots>
        </div>
        <SubmitInput msg={"start"} handleButtonClick={()=>context.changeView("mode")}></SubmitInput>
    </Menu>
}

export default WelcomeLayout;