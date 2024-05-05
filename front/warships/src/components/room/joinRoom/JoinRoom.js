import Menu from "../../utils/menu/Menu";
import SubmitMessageInput from "../../utils/submitMessageInput/SubmitMessageInput";
import MenuButton from "../../utils/menuButton/MenuButton";
import styles from "./joinRoom.module.css"
function JoinRoom({joinRoom,createRoom}){
    return<Menu containerStyle={{width:"40rem",height:"30rem",marginTop:"5rem",paddingTop:"5rem"}}>
        <SubmitMessageInput inputContainerStyle={{marginTop:"3rem"}} message={"enter room code"} buttonMessage={"go"} handleButtonClick={joinRoom} ></SubmitMessageInput>
        <div>
            <div className={styles.orText}>or</div>
            <MenuButton handleClick={createRoom} containerStyle={{marginTop:"2rem",marginLeft:"auto",marginRight:"auto",fontSize:"2.5rem"}} message={"create room"}></MenuButton>
        </div>
    </Menu>
}
export default JoinRoom