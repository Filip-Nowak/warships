import SubmitInput from "../SubmitInput/SubmitInput";
import styles from "./submit.module.css"
function SubmitMessageInput({message,buttonMessage,handleButtonClick,containerStyle,messageStyle}){
    return <div className={styles.container} style={containerStyle}>
        <div style={messageStyle}>{message}</div>
        <SubmitInput msg={buttonMessage} handleButtonClick={handleButtonClick}></SubmitInput>
    </div>
}
export default SubmitMessageInput