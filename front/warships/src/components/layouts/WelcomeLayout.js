import Menu from "../utils/Menu/Menu"
import BlinkingDots from "../utils/BlinkingDots";
import SubmitInput from "../utils/SubmitInput/SubmitInput";
import {useContext} from "react";
import GameContext from "../context/gameContext";
function WelcomeLayout(){
    const context=useContext(GameContext);
    const handleStart=(username)=>{
        context.setUsername(username);
        context.changeView("mode");
        context.test.push("dupa");
        console.log(context)
    }
    return <Menu containerStyle={{height:"20rem",width:"50rem",display:"block",marginTop:"10rem", paddingTop:"3rem"}}>
        <div  style={{
            fontSize: "2.5rem",
            marginRight: "auto",
            marginLeft: "auto",
            width:"65%",
            display: "flex",
        }}>
            <span>Type in your nickname</span><BlinkingDots></BlinkingDots>
        </div>
        <SubmitInput msg={"start"} handleButtonClick={handleStart} containerStyle={{marginTop:"4rem"}}></SubmitInput>
    </Menu>
}

export default WelcomeLayout;