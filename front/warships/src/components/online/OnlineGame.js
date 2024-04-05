import GameView from "../game/game/GameView";
import {useEffect, useState} from "react";
import online from "../../http/Online";
import useTimer from "../hooks/useTimer";
import Test from "../utils/test/Test";

function OnlineGame({createdShips,players,startingPlayer,returnToLobby}){
    const [playerShips, setPlayerShips] = useState(createdShips)
    const [enemyShips, setEnemyShips] = useState([])
    const [playerMisses, setPlayerMisses] = useState([])
    const [enemyMisses, setEnemyMisses] = useState([])
    const [infoContent, setInfoContent] = useState("")
    const [playerTurn, setPlayerTurn] = useState(startingPlayer===online.getUserId())
    const [startingScreen, setStartingScreen] = useState(true)
    const [shootingPos, setShootingPos] = useState(null)
    const [endingScreen, setEndingScreen] = useState(false)
    const [winner, setWinner] = useState(null)
    const handleTimer=()=>{

    }
   const [countdown,setCountDown]=useTimer(handleTimer)
    useEffect(() => {
       setCountDown(5);
        online.addGameLogHandler("HIT",handleHit)
        online.addGameLogHandler("SUNKEN",handleSunken)
        online.addGameLogHandler("ALREADY_HIT",handleAlreadyHit)
        online.addGameLogHandler("MISS",handleMiss)
        online.addGameLogHandler("WIN",handleWin)
        online.addGameLogHandler("STARTED_TURN",handleStartedTurn)
        online.addGameLogHandler("SHOOTING",handleShooting)
        console.log("effect")
    }, []);
    const handleHit=(msg)=>{
        setShootingPos(null)

        if(msg.senderId===online.getUserId()){
            setInfoContent("enemy ship got hit at ("+msg.pos.x+","+msg.pos.y+")")
            setEnemyShips(prevState => {
                prevState.forEach(ship=>{
                    if(!ship.sunken)
                    {
                        ship.fields.forEach(field=>{
                            if((field.x+1===msg.pos.x && field.y===msg.pos.y) || (field.x-1===msg.pos.x && field.y===msg.pos.y)
                                || (field.x===msg.pos.x && field.y+1===msg.pos.y) || (field.x===msg.pos.x && field.y-1===msg.pos.y)){
                                ship.fields.push(msg.pos)
                                return [...prevState]
                            }
                        })
                    }
                })
                const ship={fields:[msg.pos],sunken:false}
                return [...prevState,ship]

            })
        }else{
            setInfoContent("your ship got hit at ("+msg.pos.x+","+msg.pos.y+")")
            setPlayerShips(prevState => {
                prevState.forEach(ship=>{
                    if(!ship.sunken)
                    {
                        ship.fields.forEach(field=>{
                            if(field.pos.x===msg.pos.x && field.pos.y===msg.pos.y){
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
        setShootingPos(null)

        if(msg.senderId===online.getUserId()){
            setInfoContent("you missed")
            if(msg.pos===null){
                setInfoContent("you didnt shoot")
            }else
                setPlayerMisses(prevState => [...prevState,msg.pos])
        }else{
            setInfoContent("enemy missed")
            if(msg.pos===null){
                setInfoContent("enemy didnt shoot")
            }else
            setEnemyMisses(prevState => [...prevState,msg.pos])
        }
    }
    const handleSunken=(msg)=>{
        setShootingPos(null)
        if(msg.senderId===online.getUserId()){
            setInfoContent("enemy ship got sunken at ("+msg.pos.x+","+msg.pos.y+")")
            setEnemyShips(prevState=>{
                prevState.forEach(ship=>{
                    if(!ship.sunken){
                        ship.fields.forEach(field=>{
                            if((field.x+1===msg.pos.x && field.y===msg.pos.y) || (field.x-1===msg.pos.x && field.y===msg.pos.y)
                                || (field.x===msg.pos.x && field.y+1===msg.pos.y) || (field.x===msg.pos.x && field.y-1===msg.pos.y)){
                                ship.fields.push(msg.pos)
                                ship.sunken=true;
                                return [...prevState]
                            }
                        })
                    }
                })
                prevState.push({fields:[msg.pos],sunken:true})
                return [...prevState]
            })
        }else{
            setInfoContent("your ship got sunken at ("+msg.pos.x+","+msg.pos.y+")")
            setPlayerShips(prevState=>{
                prevState.forEach(ship=>{
                    if(!ship.sunken){
                        ship.fields.forEach(field=>{
                            if(field.pos.x===msg.pos.x&&field.pos.y===msg.pos.y){
                                field.hit=true;
                                ship.sunken=true;
                            }
                        })
                    }
                })
                return [...prevState]
            })
        }
    }
    const handleAlreadyHit=(msg)=>{
        if(playerTurn===online.getUserId()){
            setInfoContent("you missed")
        }else{
            setInfoContent("enemy missed")
        }
        setShootingPos(null)
    }
    const handleConsoleClick=(pos)=>{
        setShootingPos(pos)
        online.shoot(pos)
    }
    const handleWin=(msg)=>{
        setWinner(msg.senderId)
    }
    const handleShooting=(msg)=>{
        if(playerTurn){
            setInfoContent("shooting")
        }else{
            setInfoContent("enemy shooting")
        }

    }
    const handleStartedTurn=(msg)=>{
        setStartingScreen(false)
        setPlayerTurn(msg.senderId===online.getUserId())
        if(msg.senderId===online.getUserId()){
            setInfoContent("pick field to shoot")
        }else{
            setInfoContent("enemy picking field")
        }
    }


    return<GameView
            enemyMisses={enemyMisses}
            enemyShips={enemyShips}
            playerMisses={playerMisses}
            playerShips={playerShips}
            infoPanelContent={infoContent}
            handleConsoleFieldClick={handleConsoleClick}
            startingScreen={startingScreen}
            players={players}
            startingPlayer={startingPlayer}
            countdown={countdown}
            playerTurn={playerTurn}
            shootingPos={shootingPos}
            endingScreen={endingScreen}
            winner={winner}
            returnToLobby={returnToLobby}
    ></GameView>
    // return <Test start={startingPlayer}></Test>
}
export default OnlineGame