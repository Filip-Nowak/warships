import Menu from "../../utils/menu/Menu";
import CodeContainer from "./CodeContainer";
import PlayersInRoom from "./PlayersInRoom";
import MenuButton from "../../utils/menuButton/MenuButton";
import styles from "./roomView.module.css"
import {useContext} from "react";
import OnlineContext from "../../context/OnlineContext";
import online from "../../../utils/online/Online";
function RoomView({ready,handleReadyClick,startGame}) {
    const onlineContext=useContext(OnlineContext);
    let allPlayersReady=true;
    onlineContext.room.users.forEach((player)=>{
        if(!player.ready)
            allPlayersReady=false;
    })
    return <Menu
        containerStyle={{width: "40rem", height: "40rem", marginTop: "5rem", display: "flex", flexWrap: "wrap"}}>
        <CodeContainer></CodeContainer>
        <PlayersInRoom ></PlayersInRoom>
        <div className={styles.buttonContainer}>
            <MenuButton handleClick={handleReadyClick} containerStyle={{width:"80%",marginLeft:"auto",marginRight:"auto", ...ready?{backgroundColor:"#00000000",border:"0.25rem solid #8FFF00"}:{border:"0.25rem solid #1d4f02"}}} message={ready?"cancel":"ready"}></MenuButton>
            {
                onlineContext.room.users.length<2?<div className={styles.roomStatus}>waiting for other players</div>:
                    !allPlayersReady?<div className={styles.roomStatus}>players are not ready</div>:
                        onlineContext.room.ownerId!==online.getUserId()?<div className={styles.roomStatus}>room owner can start</div>:
                            <MenuButton handleClick={startGame} containerStyle={{width:"80%",marginLeft:"auto",marginRight:"auto",border:"0.25rem solid #1d4f02",marginTop:"2rem"}} message={"start game"}></MenuButton>
            }
        </div>
    </Menu>
}

export default RoomView