import Menu from "../components/utils/Menu/Menu";
import styles from "./homeLayout.module.css"
import MenuButton from "../components/utils/menuButton/MenuButton";
import SubmitInput from "../components/utils/SubmitInput/SubmitInput";
import SubmitMessageInput from "../components/utils/SubmitMessageInput/SubmitMessageInput";
import {useNavigate} from "react-router";
import onlineContext from "../components/context/OnlineContext";
import {useContext} from "react";
import Online from "../gameUtils.js/Online";
import OnlineContext from "../components/context/OnlineContext";

function HomeLayout({setUsername}) {
    const navigate = useNavigate()
    return <div>
        <div className={styles.banner}>warships</div>
        <Menu className={styles.container}>
            <Menu className={styles.onlineContainer}>
                <div className={styles.onlineLabel}>play online</div>
                <SubmitMessageInput
                    handleButtonClick={(value) => {
                        console.log(value)
                        setUsername(value);
                        navigate("/online/create-room")
                    }}
                    inputStyle={{fontSize: "5rem"}} buttonMessage={"play"} buttonMessageStyle={{fontSize: "4rem"}}
                    message={"type in your nickname"} containerStyle={{marginTop: "5rem", width: "100%"}}
                    messageStyle={{fontSize: "2rem"}} inputContainerStyle={{
                    height: "5rem",
                    fontSize: "1rem",
                    width: "70%",
                    marginTop: "2rem"
                }}></SubmitMessageInput>
            </Menu>
            <div className={styles.vsLabel}>
                <div>or</div>
            </div>
            <Menu className={styles.vsComputerContainer}>
                <div className={styles.vsComputerLabel}>vs computer</div>
                <MenuButton message={"play"} containerStyle={{
                    width: "80%",
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: "2rem"
                }} handleClick={()=>navigate("bot")}></MenuButton>
            </Menu>
        </Menu></div>
}

export default HomeLayout