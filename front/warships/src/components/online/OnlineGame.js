import GameView from "../game/game/GameView";
import {useContext, useEffect, useState} from "react";
import online from "../../http/Online";
import useTimer from "../hooks/useTimer";
import OnlineContext from "../context/OnlineContext";

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
    const [pickingField, setPickingField] = useState(false)
    const [endingEnemyShips, setEndingEnemyShips] = useState([])
    const [showEnemyShips, setShowEnemyShips] = useState(false)
    const [playerLeft, setPlayerLeft] = useState(false)
    const [forfeited, setForfeited] = useState(false)
    const onlineContext=useContext(OnlineContext)

    useEffect(() => {
        online.addGameLogHandler("HIT",handleHit)
        online.addGameLogHandler("SUNKEN",handleSunken)
        online.addGameLogHandler("ALREADY_HIT",handleAlreadyHit)
        online.addGameLogHandler("MISS",handleMiss)
        online.addGameLogHandler("STARTED_TURN",handleStartedTurn)
        online.addGameLogHandler("SHOOTING",handleShooting)
        online.addGameLogHandler("WIN",handleWin)
        online.addGameLogHandler("PLAYER_LEFT",handlePlayerLeft )
        online.addGameLogHandler("FORFEIT",handleForfeit)
        console.log("effect")
    }, []);

    function handleForfeit(msg) {
        setForfeited(true);
        const info=JSON.parse(msg.message)
        onlineContext.room.users.forEach(player=>{
            if(player.id!==info.id){
                setWinner(player.id)
            }
        })
        setEndingEnemyShips(info.ships)
    }

    function handlePlayerLeft(msg) {
        console.log("in game")
        setPlayerLeft(true)
        setWinner(online.getUserId())
        for(let i=0; i<msg.room.users.length; i++){
            if(msg.room.users[i].id!==online.getUserId()){
                setEndingEnemyShips(msg.room.users[i].ships)
            }
        }
    }
    const handleHit=(msg)=>{
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
        setShootingPos(null)
    }
    const handleMiss=(msg)=>{
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
        setShootingPos(null)
    }
    const handleSunken=(msg)=>{
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
        setShootingPos(null)
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
        setPickingField(false)
        online.shoot(pos)
    }
    const handleWin=(msg)=>{
        const info=JSON.parse(msg.message)
        setWinner(info.id)
        setEndingEnemyShips(info.ships)
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
            setPickingField(true)
        }else{
            setInfoContent("enemy picking field")
        }
    }
    // const returnToLobby=()=>{
    //     online.returnToLobby();
    // }
    const handleShowEnemyShips=()=>{
        setShowEnemyShips(true)
    }
    const hideEnemyShips=()=>{
        setShowEnemyShips(false)
    }

    const forfeit=()=>{
        online.forfeit()
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
            playerTurn={playerTurn}
            shootingPos={shootingPos}
            endingScreen={endingScreen}
            winner={winner}
            returnToLobby={returnToLobby}
            pickingField={pickingField} showEnemyShips={showEnemyShips} endingEnemyShips={endingEnemyShips}
            handleShowEnemyShips={handleShowEnemyShips}
            hideEnemyShips={hideEnemyShips}
            forfeit={forfeit}
            forfeited={forfeited}
            playerLeft={playerLeft}
    ></GameView>
    // return <Test start={startingPlayer}></Test>
}
export default OnlineGame