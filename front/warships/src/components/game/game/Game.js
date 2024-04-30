import GameView from "./GameView";
import {useContext, useEffect, useState} from "react";
import LoadingContext from "../../context/LoadingContext";
import getEmptyFields from "../../utils/getEmptyFields";
import {forCrossFields, getField} from "../../utils/board/boardUitils";

function Game({game, startingPlayer, playerFields, setPlayerFields,returnToLobby}) {
    const [playerTurn, setPlayerTurn] = useState(false);
    const [startingScreen, setStartingScreen] = useState(true)
    const [forfeited, setForfeited] = useState(false)
    const [playerLeft, setPlayerLeft] = useState(false)
    const [winner, setWinner] = useState(null)
    const [infoPanel, setInfoPanel] = useState("co sie gapisz")
    const [enemyFields, setEnemyFields] = useState(getEmptyFields)
    const [endingEnemyFields, setEndingEnemyFields] = useState(null)
    const [showEnemyShips, setShowEnemyShips] = useState(false)
    const loadingContext = useContext(LoadingContext)
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
            setInfoPanel("enemy didnt shoot")
        } else {
            setPlayerFields(prevState=>{
                prevState[pos.y][pos.x]=4
                return [...prevState]
            })
            setInfoPanel("enemy missed at " + pos.x + " : " + pos.y)
        }
    }
    const onPlayerStartedTurn=()=>{
        setStartingScreen(false)
        setInfoPanel("pick field")
        setPlayerTurn(true)
    }
    const onEnemyStartedTurn=()=>{
        setStartingScreen(false)
        setInfoPanel("enemy picking field")
        setPlayerTurn(false)
    }
    const onEnemyHit = (pos) => {
        setInfoPanel("enemy hit at "+pos.x+" : "+pos.y)
        setPlayerFields(prevState=>{
            prevState[pos.y][pos.x]=2;
            return [...prevState]
        })
    }
    const onEnemySunken = (pos) => {
        setInfoPanel("enemy sunken ship at "+pos.x+" : "+pos.y)
        setPlayerFields(prevState => {
            return sunkShip(pos,prevState,2,3)
        })
    }

    const onEnemyAlreadyHit=(pos)=>{
        setInfoPanel("enemy hit at "+pos.x+" : "+pos.y+" (already hit)")
    }
    const onPlayerHit = ({x, y}) => {
        console.log("hit")
        setInfoPanel("enemy ship hit at " + x + ":" + y)
        setEnemyFields(prevState => {
            prevState[y][x] = 1
            return [...prevState]
        })
    }
    const onPlayerMiss = (pos) => {
        console.log("miss")
        console.log(pos)
        setInfoPanel("you missed")
        if (pos == null) {
            setInfoPanel("you didnt shot")
        } else {
            setEnemyFields(prevState => {
                prevState[pos.y][pos.x] = 3;
                return [...prevState]
            })
        }
    }
    const onPlayerSunken = (pos) => {
        console.log("sunken")
        setInfoPanel("enemy ship got sunken at (" + pos.x + "," + pos.y + ")")
        setEnemyFields(prevState => {
            return sunkShip(pos,prevState,1,2)
        })
    }
    const onPlayerShooting = () => {
        console.log("shooting")
        setInfoPanel("shooting")
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
        setInfoPanel("enemy shooting")
    }
    const onStart = () => {
        console.log("onstart")
        setStartingScreen(false)
    }
    const handleConsoleClick = (pos) => {
        setPlayerTurn(false)
        setShootingPos(pos)
    }
    const onWin=(enemyFields)=>{
        setWinner(true)
        setEndingEnemyFields(enemyFields);
    }
    const onLost=(enemyFields)=>{
        setWinner(false)
        setEndingEnemyFields(enemyFields);
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
        game.endGame();
    }

    return <GameView startingScreen={startingScreen} startingPlayer={startingPlayer}
                     forfeited={forfeited} handleConsoleFieldClick={handleConsoleClick}
                     handleShowEnemyShips={handleShowEnemyShips} playerFields={playerFields} playerLeft={playerLeft}
                     returnToLobby={returnToLobby} winner={winner} players={game.players} infoPanelContent={infoPanel}
                     enemyFields={enemyFields} forfeit={forfeit} playerTurn={playerTurn} enemyNickname={game.players[game.enemyIndex]} hideEnemyShips={hideEnemyShips} showEnemyShips={showEnemyShips} endingEnemyFields={endingEnemyFields}/>
}

export default Game