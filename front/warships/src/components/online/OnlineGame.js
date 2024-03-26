import GameView from "../game/game/GameView";
import {useEffect, useState} from "react";
import online from "../../http/Online";

function OnlineGame({createdShips}){
    const [playerShips, setPlayerShips] = useState(createdShips)
    const [enemyShips, setEnemyShips] = useState([])
    const [playerMisses, setPlayerMisses] = useState([])
    const [enemyMisses, setEnemyMisses] = useState([])
    const [infoContent, setInfoContent] = useState("")
    useEffect(() => {
        online.addGameLogHandler("HIT",handleHit)
        online.addGameLogHandler("SUNKEN",handleSunken)
        online.addGameLogHandler("ALREADY_HIT",handleAlreadyHit)
        online.addGameLogHandler("MISS",handleMiss)
        online.addGameLogHandler("WIN",handleWin)
    }, []);
    const handleHit=(msg)=>{
        if(msg.senderId===online.getUserId()){
            setEnemyShips(prevState => {
                prevState.forEach(ship=>{
                    if(!ship.sunken)
                    {
                        ship.fields.forEach(field=>{
                            if(field.pos===msg.pos){
                                field.hit=true;
                            }
                        })
                    }
                })
                return [...prevState]
            })
        }else{
            setPlayerShips(prevState => {
                prevState.forEach(ship=>{
                    if(!ship.sunken)
                    {
                        ship.fields.forEach(field=>{
                            if(field.pos===msg.pos){
                                field.hit=true;
                            }
                        })
                    }
                })
                return [...prevState]
            })
        }
    }
    const handleMiss=(msg)=>{
        if(msg.senderId===online.getUserId()){
            if(msg.pos===null){
                console.log("didint shot")
            }else
                setPlayerMisses(prevState => [...prevState,msg.pos])
        }else{
            if(msg.pos===null){
                console.log("didint shot")
            }else
            setEnemyMisses(prevState => [...prevState,msg.pos])
        }
    }
    const handleSunken=(msg)=>{
        if(msg.senderId===online.getUserId()){
            setEnemyShips(prevState => {
                prevState.forEach(ship=>{
                    if(!ship.sunken)
                    {
                        ship.fields.forEach(field=>{
                            if(field.pos===msg.pos){
                                field.hit=true;
                                ship.sunken=true;
                            }
                        })
                    }
                })
                return [...prevState]
            })
        }else{

        }
    }
    const handleAlreadyHit=(msg)=>{

    }
    const handleConsoleClick=(pos)=>{
        online.shoot(pos)
    }
    const handleWin=(msg)=>{

    }
    return<GameView enemyMisses={enemyMisses} enemyShips={enemyShips} playerMisses={playerMisses} playerShips={playerShips} infoPanelContent={infoContent} handleConsoleFieldClick={handleConsoleClick}></GameView>
}
export default OnlineGame