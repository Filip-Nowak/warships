import SubmitInput from "../SubmitInput/SubmitInput";
import styles from "./submit.module.css"
function SubmitMessageInput({message,buttonMessage,handleButtonClick,containerStyle,messageStyle}){
    return <div style={containerStyle}>
        <div className={styles.message} style={messageStyle}>{message}</div>
        <SubmitInput msg={buttonMessage} handleButtonClick={handleButtonClick} containerStyle={{marginTop:"2rem"}}></SubmitInput>
    </div>
}
export default SubmitMessageInput