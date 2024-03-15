import Menu from "../utils/Menu/Menu";
import SubmitMessageInput from "../utils/SubmitMessageInput/SubmitMessageInput";

function JoinRoom(){
    return<Menu containerStyle={{width:"40em",height:"40em",marginTop:"5em"}}>
        <SubmitMessageInput message={"enter room code"} buttonMessage={"go"} containerStyle={{marginLeft:"auto",marginRight:"auto"}}></SubmitMessageInput>
    </Menu>
}
export default JoinRoom