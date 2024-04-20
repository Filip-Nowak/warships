import GameView from "./GameView";
import {useContext, useEffect, useState} from "react";
import LoadingContext from "../../context/LoadingContext";
import getEmptyFields from "../../utils/getEmptyFields";
import {forCrossFields, getField, printFields} from "../../utils/board/boardUitils";

function Game({game, startingPlayer, playerFields, setPlayerFields}) {
    const [playerTurn, setPlayerTurn] = useState(false);
    const [startingScreen, setStartingScreen] = useState(true)
    const [forfeited, setForfeited] = useState(false)
    const [playerLeft, setPlayerLeft] = useState(false)
    const [winner, setWinner] = useState(null)
    const [infoPanel, setInfoPanel] = useState("co sie gapisz")
    const [enemyFields, setEnemyFields] = useState(getEmptyFields)
    const loadingContext = useContext(LoadingContext)
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

    }, []);
    const onEnemyMiss = (pos) => {
        if (pos === null) {
            setInfoPanel("enemy didnt shoot")
        } else {
            setInfoPanel("enemy missed at " + pos.x + " : " + pos.y)
            setPlayerFields(prevFields => {
                prevFields[pos.y][pos.x] = 4;
                return [...prevFields]
            })
        }
    }
    const onPlayerStartedTurn=()=>{
        setInfoPanel("pick field")
        setPlayerTurn(true)
    }
    const onEnemyStartedTurn=()=>{
        setInfoPanel("enemy picking field")
        setPlayerTurn(false)
    }
    const onEnemyHit = (pos) => {
        setInfoPanel("enemy hit at "+pos.x+" : "+pos.y)
        setPlayerFields(prevState=>{
            console.log(prevState)
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
        setInfoPanel("enemy ship hit at " + x + ":" + y)
        setEnemyFields(prevState => {
            prevState[y][x] = 1
            return [...prevState]
        })
    }
    const onPlayerMiss = (pos) => {
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
        setInfoPanel("enemy ship got sunken at (" + pos.x + "," + pos.y + ")")
        setEnemyFields(prevState => {
            return sunkShip(pos,prevState,1,2)
        })
    }

    const onPlayerShooting = () => {
        setInfoPanel("shooting")
    }
    const onEnemyShooting = () => {
        setInfoPanel("enemy shooting")
    }
    const onStart = () => {
        console.log("onstart")
        setStartingScreen(false)
    }
    const handleConsoleClick = (pos) => {
        setPlayerTurn(false)
        game.shoot(pos)
    }
    const onWin=()=>{
        setWinner(true)
        console.log("win")
    }
    const handleShowEnemyShips = () => {

    }
    const onPlayerForfeit=()=>{
        setForfeited(true)
        setWinner(false)
    }
    const returnToLobby = () => {

    }
    const forfeit = () => {
        game.forfeit()
    }
    const sunkShip=({x,y},fields,hit,sunken)=>{
        const callback = (x, y, fields) => {
            printFields(fields)
            if (getField(x, y, fields) === hit) {
                fields[y][x] = sunken
                forCrossFields(x, y, fields, callback)
            }
        }
        fields[y][x] = sunken;
        forCrossFields(x, y, fields, callback)
        return [...fields];
    }
    return <GameView startingScreen={startingScreen} startingPlayer={startingPlayer}
                     forfeited={forfeited} handleConsoleFieldClick={handleConsoleClick}
                     handleShowEnemyShips={handleShowEnemyShips} playerFields={playerFields} playerLeft={playerLeft}
                     returnToLobby={returnToLobby} winner={winner} players={game.players} infoPanelContent={infoPanel}
                     enemyFields={enemyFields} forfeit={forfeit} playerTurn={playerTurn}/>
}

export default Game