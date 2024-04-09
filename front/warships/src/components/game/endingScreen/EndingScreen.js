import FullScreenInfo from "../../utils/loading/FullScreenInfo";
import Menu from "../../utils/Menu/Menu";
import MenuButton from "../../utils/menuButton/MenuButton";
import online from "../../../http/Online";

function EndingScreen({winner,showEnemyShips,returnToRoom}){
    return <FullScreenInfo>
        <Menu containerStyle={{width:"50rem",padding:"2.5rem",marginTop:"25rem"}}>
            <div style={{marginLeft:"auto",marginRight:"auto",width:"fit-content"}}>{winner===online.getUserId()?"you won":"you lost"}</div>
            <div style={{display:"flex", justifyContent:"space-between",marginTop:"3rem"}}>
                <MenuButton message={"show enemy ships"} handleClick={showEnemyShips} containerStyle={{width:"40%",fontSize:"2rem"}}>
                </MenuButton>
                <MenuButton message={"return to lobby"} handleClick={returnToRoom} containerStyle={{width:"40%",fontSize:"2rem"}}></MenuButton>
            </div>
        </Menu>
    </FullScreenInfo>
}
export default EndingScreen