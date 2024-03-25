import JoinRoom from "../room/joinRoom/JoinRoom";
// import http from "../../http/http";
import {useContext, useEffect, useState} from "react";
import GameContext from "../context/gameContext";
import RoomView from "../room/roomView/RoomView";
import io from "socket.io-client"
import online from "../../http/Online";
import CreatorMenu from "../creator/creatorMenu/CreatorMenu";
import player from "../room/roomView/Player";
import GameView from "../game/game/GameView";

// import WebSocketClient from "websocket"

function MultiplayerLayout({setOnlineInfo}) {
    const context = useContext(GameContext);
    // const [userId, setUserId] = useState("")
    const [fetching, setFetching] = useState(true);
    const [room, setRoom] = useState({id: "", players: [],ownerId:""})
    const [ready, setReady] = useState(false)
    const [inGame, setInGame] = useState(false);
    const [inRoom, setInRoom] = useState(true)

    const onConnected = () => {
        online.createUser().then(()=>{
            online.addRoomMessageHandler("ROOM_CREATED",onCreatedRoom)
            online.addRoomMessageHandler("JOINED_ROOM",onJoinRoom)
            online.addRoomMessageHandler("READY",onPlayerReady)
            online.addRoomMessageHandler("START",onStartCreator)
            online.addRoomMessageHandler("NO_SHIPS",onNoShips)
            online.addRoomMessageHandler("LAUNCH",onLaunch)
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
        console.log("created room")
        console.log(msg)
        setRoom(msg.room)
        setFetching(false)
    }
    const onJoinRoom=(msg)=>{
        console.log("joined")
        online.setRoomId(msg.room.id)
        setRoom(msg.room)
        setFetching(false)
    }
    const onStartCreator=(msg)=>{
        enterCreator()
    }
    const onNoShips=(msg)=>{
        let username;
        console.log(msg)
        msg.room.players.forEach((player)=>{
            console.log(player.id)
            console.log(msg.userId)
            if(player.id===msg.userId){
                username=player.nickname
            }
        })
        console.log("player "+username+"no ships xd")
    }
    const onLaunch=(msg)=>{
        setFetching(false)
        setInGame(true)
        console.log("launching")
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
        online.submitShips()
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
                        <GameView createdShips={}></GameView>

            }

        </>)
}

export default MultiplayerLayout