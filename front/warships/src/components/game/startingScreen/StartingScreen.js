import Menu from "../../utils/Menu/Menu";
import PlayersInfo from "./PlayersInfo";
import FullScreenInfo from "../../utils/loading/FullScreenInfo";

function StartingScreen({players, startingId, countdown}) {
    return <FullScreenInfo>
            <Menu containerStyle={{width:"50rem", height:"10rem",marginTop:"20rem",paddingTop:"2rem"}}>
                <PlayersInfo players={players} startingId={startingId}></PlayersInfo>
                <div>game starts in {countdown}</div>
            </Menu>
    </FullScreenInfo>
}

export default StartingScreen