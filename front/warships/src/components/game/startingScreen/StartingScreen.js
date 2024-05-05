import Menu from "../../utils/menu/Menu";
import PlayersInfo from "./PlayersInfo";
import FullScreenInfo from "../../utils/loading/FullScreenInfo";
import styles from "./startingScreen.module.css"
import useTimer from "../../hooks/useTimer";
import {useEffect} from "react";
function StartingScreen({players, startingId}) {
    const [countdown,setCountdown]=useTimer(()=>{})
    useEffect(() => {
        setCountdown(5)
    }, []);
    return <FullScreenInfo>
            <Menu containerStyle={{width:"50rem", height:"13rem",marginTop:"20rem",paddingTop:"2rem"}}>
                <PlayersInfo players={players} startingId={startingId}></PlayersInfo>
                <div className={styles.countdown}>game starts in {countdown}</div>
            </Menu>
    </FullScreenInfo>
}

export default StartingScreen