import GameView from "../game/game/GameView";
import {useEffect, useState} from "react";

function OnlineGame({online,createdShips}){
    const [playerShips, setPlayerShips] = useState(createdShips)
    const [enemyShips, setEnemyShips] = useState([])
    const [playerMisses, setPlayerMisses] = useState([])
    const [enemyMisses, setEnemyMisses] = useState([])
    const [infoContent, setInfoContent] = useState("")
    useEffect(() => {
        online.addGameMessageHandler("HIT",handleHit)
    }, []);
    const handleHit=(msg)=>{
        console.log("hit")
    }
    return<GameView enemyMisses={enemyMisses} enemyShips={enemyShips} playerMisses={playerMisses} playerShips={playerShips} infoPanelContent={infoContent}></GameView>
}
export default OnlineGame