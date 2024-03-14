import BlinkingDots from "./BlinkingDots";
import SubmitInput from "./SubmitInput";
function WelcomeMenu({handleButtonClick}){
    console.log("hello")
    return <div >
        <div  style={{
            display:"flex"
        }}>
            <span>Type in your nickname</span><BlinkingDots></BlinkingDots>
        </div>
        <SubmitInput msg={"start"} handleButtonClick={handleButtonClick}></SubmitInput>
    </div>
}
export default WelcomeMenu;