import SubmitInput from "../submitInput/SubmitInput";
import styles from "./submit.module.css"
function SubmitMessageInput({message,buttonMessage,handleButtonClick,containerStyle,messageStyle,inputContainerStyle,buttonMessageStyle,inputStyle}){
    return <div style={containerStyle}>
        <div className={styles.message} style={messageStyle}>{message}</div>
        <SubmitInput inputStyle={inputStyle} buttonMessageStyle={buttonMessageStyle} msg={buttonMessage} handleButtonClick={handleButtonClick} containerStyle={inputContainerStyle}></SubmitInput>
    </div>
}
export default SubmitMessageInput