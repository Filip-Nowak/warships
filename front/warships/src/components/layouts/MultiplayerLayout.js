import JoinRoom from "../room/joinRoom/JoinRoom";
import http from "../../http/http";
import {useContext, useEffect, useState} from "react";
import GameContext from "../context/gameContext";
import RoomView from "../room/roomView/RoomView";
import io from "socket.io-client"

// import WebSocketClient from "websocket"

function MultiplayerLayout({setOnlineInfo}) {
    const context = useContext(GameContext);
    const [userId, setUserId] = useState("")
    const [fetching, setFetching] = useState(true);
    const [room, setRoom] = useState({id: "", players: []})
    const [ready, setReady] = useState(false)
    useEffect(() => {
        http.createUser(context.username).then((id) => {
            setUserId(id)
            http.openRoomWs(()=>{setFetching(false)},(error)=>{console.log("error")},handleRoomMessage)

        })
    }, []);
    const handleCreateRoom = () => {
        setFetching(true)
        http.createRoom();

    }
    const onCreatedRoom = (room) => {
        setRoom(room);
    }
    const handleRoomMessage = (message) => {
        const data = JSON.parse(message.body);
        if (data.type === "CREATED_ROOM") {
            http.roomId=data.room.id;
            let createdRoom = {
                id: data.room.id,
                ownerId:data.room.ownerId,
                players: data.room.players,
            }
            setRoom(createdRoom);
            setFetching(false)
        }else if(data.type==="JOINED_ROOM"){
            console.log("joined")
            const createdRoom={
                id:data.room.id,
                players: data.room.players,
                ownerId:data.room.ownerId
            }
            setRoom(createdRoom)
        }else if(data.type==="READY"){
            const createdRoom={
                id:data.room.id,
                players: data.room.players,
                ownerId:data.room.ownerId
            }
            setRoom(createdRoom)
        }else if(data.type==='START'){
            startGame()
        }

    }
    const handleReadyButtonClick=()=>{
        http.setReady(!ready)
        setReady(prevState => !prevState)
    }
    const joinRoom=(code)=>{
        setFetching(true);
        http.joinRoom(code)
    }
    const startGame=()=>{
        console.log("starting")
        context.changeView("online")
        setOnlineInfo({userId:userId,room:room})
    }
    const handleStartClick=()=>{
        http.startGame();
    }
    console.log(userId+" "+room.ownerId)
    return (
        <>
            {room.id === "" ? <JoinRoom joinRoom={joinRoom} fetching={fetching} createRoom={handleCreateRoom}></JoinRoom> :
                <RoomView handleReadyClick={handleReadyButtonClick} room={room} ready={ready} owner={userId===room.ownerId} startGame={handleStartClick}></RoomView>}
        </>)
}

export default MultiplayerLayout