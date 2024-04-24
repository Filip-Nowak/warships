import JoinRoom from "../room/joinRoom/JoinRoom";
// import gameUtils.js from "../../gameUtils.js/gameUtils.js";
import {useContext, useEffect, useState} from "react";
import GameContext from "../context/gameContext";
import RoomView from "../room/roomView/RoomView";
import io from "socket.io-client"
import online from "../../gameUtils.js/Online";
import CreatorMenu from "../creator/creatorMenu/CreatorMenu";
import player from "../room/roomView/RoomPlayer";
import GameView from "../game/game/GameView";
import OnlineGame2 from "./OnlineGame2";

// import WebSocketClient from "websocket"

function MultiplayerLayout({setOnlineInfo}) {
    const context = useContext(GameContext);
    // const [userId, setUserId] = useState("")
    const [fetching, setFetching] = useState(true);
    const [room, setRoom] = useState({id: "", players: [],ownerId:""})
    const [ready, setReady] = useState(false)
    const [inGame, setInGame] = useState(false);
    const [inRoom, setInRoom] = useState(true)
    const [createdShips, setCreatedShips] = useState([])
    const [startingPlayer, setStartingPlayer] = useState("")
    const onConnected = () => {
        online.createUser().then(()=>{
            online.addRoomMessageHandler("ROOM_CREATED",onCreatedRoom)
            online.addRoomMessageHandler("JOINED_ROOM",onJoinRoom)
            online.addRoomMessageHandler("READY",onPlayerReady)
            online.addRoomMessageHandler("START",onStartCreator)
            online.addRoomMessageHandler("NO_SHIPS",onNoShips)
            online.addRoomMessageHandler("LAUNCH",onLaunch)
            online.addRoomMessageHandler("RETURN_TO_ROOM",handleReturnToLobby)
            setFetching(false)
        })
    }
    const onError = (e) => {
        console.log("error")
        console.log(e)
    }
    async function connect(){
        await online.connect(context.username,onConnected,onError)

    }
    useEffect(() => {
        connect();
        // online.connect().then(() => {
        //     online.createUser()
        //     online.addRoomMessageHandler("CREATE_ROOM", onCreatedRoom);
        // })
    }, []);
    const handleCreateRoom = () => {
        setFetching(true)
        online.createRoom()
    }
    const onCreatedRoom = (msg) => {
        online.setRoomId(msg.room.id)
        setRoom(msg.room)
        setFetching(false)
    }
    const onJoinRoom=(msg)=>{
        online.setRoomId(msg.room.id)
        setRoom(msg.room)
        setFetching(false)
    }
    const onStartCreator=(msg)=>{
        enterCreator()
    }
    const onNoShips=(msg)=>{
        setInRoom(true)
        setRoom(msg.room)
        setReady(false)
    }
    const onLaunch=(msg)=>{
        setFetching(false)
        setInGame(true)
        setStartingPlayer(msg.userId)
    }
    const onPlayerReady=(msg)=>{
        setRoom(msg.room)
    }
    const handleReadyButtonClick = () => {
        online.setReady(!ready)
        setReady(prevState => !prevState)
    }
    const joinRoom = (code) => {
        setFetching(true);
        online.joinRoom(code)
    }
    const enterCreator = () => {
        setInRoom(false)
    }
    const handleStartClick = () => {
        online.startCreator();
    }
    const submitShips=(ships)=>{
        setFetching(true)
        setCreatedShips(ships)
        online.submitShips(ships)
    }
    const handleReturnToLobby=(msg)=>{
        console.log("return")
        setInRoom(true)
        setInGame(false)
        setReady(false)
        setRoom(prevState => {
            return msg.room
        })
        setStartingPlayer("")
        setCreatedShips([])
    }
    return (
        <>
            {
                inRoom?
                    room.id === "" ?
                            <JoinRoom joinRoom={joinRoom} fetching={fetching} createRoom={handleCreateRoom}></JoinRoom> :
                            <RoomView handleReadyClick={handleReadyButtonClick} room={room} ready={ready}
                                      owner={online.getUserId() === room.ownerId}
                                      startGame={handleStartClick}></RoomView>
                    :
                    !inGame?
                        <CreatorMenu online={true} submitShips={submitShips} fetching={fetching}></CreatorMenu>
                        :
                        <OnlineGame2 createdShips={createdShips} players={room.players} startingPlayer={startingPlayer}></OnlineGame2>

            }

        </>)
}

export default MultiplayerLayout