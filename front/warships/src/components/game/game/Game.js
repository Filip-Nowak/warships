import GameView from "./GameView";
import {useContext, useEffect, useState} from "react";
import LoadingContext from "../../context/LoadingContext";
import getEmptyFields from "../../utils/getEmptyFields";
import {forCrossFields, getField} from "../../utils/board/boardUitils";
import useTimer from "../../hooks/useTimer";
import BlinkingDots from "../../utils/BlinkingDots";

function Game({game, startingPlayer, playerFields, setPlayerFields,returnToLobby}) {
    const [playerTurn, setPlayerTurn] = useState(false);
    const [startingScreen, setStartingScreen] = useState(true)
    const [forfeited, setForfeited] = useState(false)
    const [playerLeft, setPlayerLeft] = useState(false)
    const [winner, setWinner] = useState(null)
    const [info, setInfo] = useState({message:"",loading:false})
    const [enemyFields, setEnemyFields] = useState(getEmptyFields)
    const [endingEnemyFields, setEndingEnemyFields] = useState(null)
    const [showEnemyShips, setShowEnemyShips] = useState(false)
    const loadingContext = useContext(LoadingContext)
    const onTimeout=()=>{
        if(playerTurn)
            game.shoot(null);
    }
    const [time,setTime]=useTimer(onTimeout)
    const [shootingPos, setShootingPos] = useState(null)
    useEffect(() => {
        loadingContext.setLoading(false)
        game.gameEvents.onStart = onStart;
        game.gameEvents.onPlayerShooting = onPlayerShooting;
        game.gameEvents.onPlayerHit = onPlayerHit;
        game.gameEvents.onEnemyShooting = onEnemyShooting;
        game.gameEvents.onPlayerMiss = onPlayerMiss;
        game.gameEvents.onPlayerSunken = onPlayerSunken;
        game.gameEvents.onEnemyHit = onEnemyHit
        game.gameEvents.onEnemySunken = onEnemySunken;
        game.gameEvents.onEnemyMiss = onEnemyMiss;
        game.gameEvents.onEnemyAlreadyHit=onEnemyAlreadyHit
        game.gameEvents.onPlayerStartedTurn=onPlayerStartedTurn;
        game.gameEvents.onEnemyStartedTurn=onEnemyStartedTurn;
        game.gameEvents.onWin=onWin
        game.gameEvents.onPlayerForfeit=onPlayerForfeit
        game.gameEvents.onEnemyForfeit=onEnemyForfeit
        game.gameEvents.onPlayerLeft=onPlayerLeft;
        game.gameEvents.onLost=onLost;

    }, []);
    useEffect(() => {
        if(shootingPos!==null){
            game.shoot(shootingPos)
        }
    }, [shootingPos]);
    const onEnemyMiss = (pos) => {
        if (pos === null) {
            setInfo({message:"enemy didnt shoot"})
        } else {
            setPlayerFields(prevState=>{
                prevState[pos.y][pos.x]=4
                return [...prevState]
            })
            setInfo({message:"enemy missed at " + pos.x + " : " + pos.y})
        }
    }
    const onPlayerStartedTurn=(time)=>{
        setStartingScreen(false)
        setInfo({message:"pick field"})
        setPlayerTurn(true)
        if(time)
            setTime(time);
    }
    const onEnemyStartedTurn=(time)=>{
        setStartingScreen(false)
        setInfo({message:"enemy picking field",loading: true})
        setPlayerTurn(false)
        if(time)
            setTime(time);
    }
    const onEnemyHit = (pos) => {
        setInfo({message:"enemy hit at "+pos.x+" : "+pos.y})
        setPlayerFields(prevState=>{
            prevState[pos.y][pos.x]=2;
            return [...prevState]
        })
    }
    const onEnemySunken = (pos) => {
        setInfo({message:"enemy sunken ship at "+pos.x+" : "+pos.y})
        setPlayerFields(prevState => {
            return sunkShip(pos,prevState,2,3)
        })
    }

    const onEnemyAlreadyHit=(pos)=>{
        setInfo({message:"enemy hit at "+pos.x+" : "+pos.y+" (already hit)"})
    }
    const onPlayerHit = ({x, y}) => {
        console.log("hit")
        setInfo({message:"enemy ship hit at " + x + ":" + y})
        setEnemyFields(prevState => {
            prevState[y][x] = 1
            return [...prevState]
        })
    }
    const onPlayerMiss = (pos) => {
        console.log("miss")
        console.log(pos)
        setInfo({message:"you missed"})
        if (pos == null) {
            setInfo({message:"you didnt shot"})
        } else {
            setEnemyFields(prevState => {
                prevState[pos.y][pos.x] = 3;
                return [...prevState]
            })
        }
    }
    const onPlayerSunken = (pos) => {
        console.log("sunken")
        setInfo({message:"enemy ship got sunken at (" + pos.x + "," + pos.y + ")"})
        setEnemyFields(prevState => {
            return sunkShip(pos,prevState,1,2)
        })
    }
    const onPlayerShooting = () => {
        console.log("shooting")
        setInfo({message:"shooting",loading:true})
        setTime(0)
        setEnemyFields(prevState=>{
            setShootingPos(pos=>{
                prevState[pos.y][pos.x]+=10;
                return pos
            })
            return [...prevState]
        })
    }
    console.log("game")
    console.log(enemyFields)
    const onEnemyShooting = () => {
        setInfo({message:"enemy shooting",loading:true})
        setTime(0);
    }
    const onStart = () => {
        console.log("onstart")
        setStartingScreen(false)
    }
    const handleConsoleClick = (pos) => {
        setTime(0);
        setPlayerTurn(false)
        setShootingPos(pos)
    }
    const onWin=(enemyFields)=>{
        setWinner(true)
        setEndingEnemyFields(enemyFields);
        setTime(0)
    }
    const onLost=(enemyFields)=>{
        setWinner(false)
        setEndingEnemyFields(enemyFields);
        setTime(0)
    }
    const handleShowEnemyShips = () => {
        setShowEnemyShips(true)
    }
    const onPlayerForfeit=(enemyShips)=>{
        console.log("you forfeited")
        setShootingPos(prevState=>{
            if(prevState!==null)
            {
                setEnemyFields(prevFields=>{
                    prevFields[prevState.y][prevState.x]-=10
                    return [...prevFields]
                })
            }
            return null
        })
        const fields=getEmptyFields()
        for(let i=0;i<fields.length;i++){
            for(let j=0;j<fields[i].length;j++){
                if(enemyShips[i][j]===2)
                    continue
                fields[i][j]=enemyShips[i][j]
            }
        }
        setEndingEnemyFields(enemyShips)
        setForfeited(true)
        setWinner(false)
        setTime(0)

        game.endGame();
    }
    const onEnemyForfeit=(enemyShips)=>{
        console.log("enemy forfeit")
        setShootingPos(prevState=>{
            if(prevState!==null)
            {
                setEnemyFields(prevFields=>{
                    prevFields[prevState.y][prevState.x]-=10
                    return [...prevFields]
                })
            }
            return prevState
        })
        setEndingEnemyFields(enemyShips)
        setForfeited(true)
        setWinner(true)
        setTime(0)
        game.endGame();
    }
    const forfeit = () => {
        game.forfeit()
    }
    const sunkShip=({x,y},fields,hit,sunken)=>{
        const callback = (x, y, fields) => {
            if (getField(x, y, fields) === hit) {
                fields[y][x] = sunken
                forCrossFields(x, y, fields, callback)
            }
        }
        fields[y][x] = sunken;
        forCrossFields(x, y, fields, callback)
        return [...fields];
    }
    const hideEnemyShips=()=>{
        setShowEnemyShips(false)
    }
    const onPlayerLeft=(fields)=>{
        setShootingPos(prevState=>{
            if(prevState!==null)
            {
                setEnemyFields(prevFields=>{
                    prevFields[prevState.y][prevState.x]-=10
                    return [...prevFields]
                })
            }
            return prevState
        })
        setEndingEnemyFields(fields)
        setPlayerLeft(true)
        setWinner(true)
        setTime(0)
        game.endGame();
    }

    return <GameView startingScreen={startingScreen} startingPlayer={startingPlayer} time={time}
                     forfeited={forfeited} handleConsoleFieldClick={handleConsoleClick}
                     handleShowEnemyShips={handleShowEnemyShips} playerFields={playerFields} playerLeft={playerLeft}
                     returnToLobby={returnToLobby} winner={winner} players={game.players} info={info}
                     enemyFields={enemyFields} forfeit={forfeit} playerTurn={playerTurn} enemyNickname={game.players[game.enemyIndex]} hideEnemyShips={hideEnemyShips} showEnemyShips={showEnemyShips} endingEnemyFields={endingEnemyFields}/>
}

export default Game