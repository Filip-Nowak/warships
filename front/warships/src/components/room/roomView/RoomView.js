import Menu from "../../utils/Menu/Menu";
import CodeContainer from "./CodeContainer";
import PlayersInRoom from "./PlayersInRoom";
import MenuButton from "../../utils/menuButton/MenuButton";
import styles from "./roomView.module.css"
function RoomView({room,ready,handleReadyClick}) {
    console.log(room)
    return <Menu
        containerStyle={{width: "40rem", height: "40rem", marginTop: "5rem", display: "flex", flexWrap: "wrap"}}>
        <CodeContainer code={room.id}></CodeContainer>
        <PlayersInRoom players={room.players}></PlayersInRoom>
        <div className={styles.buttonContainer}>
            <MenuButton handleClick={handleReadyClick} containerStyle={{width:"80%",marginLeft:"auto",marginRight:"auto", ...ready?{backgroundColor:"#00000000",border:"0.25rem solid #8FFF00"}:{border:"0.25rem solid #1d4f02"}}} message={ready?"cancel":"ready"}></MenuButton>
        </div>
    </Menu>
}

export default RoomView