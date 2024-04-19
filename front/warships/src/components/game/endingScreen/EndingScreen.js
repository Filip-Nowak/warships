import FullScreenInfo from "../../utils/loading/FullScreenInfo";
import Menu from "../../utils/Menu/Menu";
import MenuButton from "../../utils/menuButton/MenuButton";
import online from "../../../gameUtils.js/Online";

function EndingScreen({winner,showEnemyShips,returnToRoom, forfeited, playerLeft}){
    let message=""
    if(forfeited){
        if(winner===online.getUserId()){
            message="enemy forfeited";
        }else{
            message="you forfeited";
        }
    }else if(playerLeft){
        message="enemy left"
    }
    return <FullScreenInfo>
        <Menu containerStyle={{width:"50rem",padding:"2.5rem",marginTop:"25rem"}}>
            <div style={{marginLeft:"auto",marginRight:"auto",width:"fit-content"}}>{winner===online.getUserId()?"you won":"you lost"}</div>
            <div>{message}</div>
            <div style={{display:"flex", justifyContent:"space-between",marginTop:"3rem"}}>
                <MenuButton message={"show enemy ships"} handleClick={showEnemyShips} containerStyle={{width:"40%",fontSize:"2rem"}}>
                </MenuButton>
                <MenuButton message={"return to lobby"} handleClick={returnToRoom} containerStyle={{width:"40%",fontSize:"2rem"}}></MenuButton>
            </div>
        </Menu>
    </FullScreenInfo>
}
export default EndingScreen