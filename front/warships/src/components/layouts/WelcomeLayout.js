
import WelcomeMenu from "../WelcomeMenu";
import Menu from "../Menu";
import BlinkingDots from "../BlinkingDots";
import SubmitInput from "../SubmitInput";
function WelcomeLayout({handleButtonClick}){
    //return <WelcomeMenu handleButtonClick={handleButtonClick}></WelcomeMenu>
    return <Menu height={"20em"} width={"50em"} bgColor={"#0F2703"} style={{display:"block",marginTop:"10em", paddingTop:"3em"}}>
        <div  style={{
            fontSize: "2.5em",
            marginRight: "auto",
            marginLeft: "auto",
            width:"65%",
            display: "flex",
        }}>
            <span>Type in your nickname</span><BlinkingDots></BlinkingDots>
        </div>
        <SubmitInput msg={"start"} handleButtonClick={handleButtonClick}></SubmitInput>
    </Menu>
}

export default WelcomeLayout;