import JoinRoom from "../room/joinRoom/JoinRoom";
import http from "../../http/http";
import {useContext, useEffect, useState} from "react";
import GameContext from "../context/gameContext";
import RoomView from "../room/roomView/RoomView";
import io from "socket.io-client"

// import WebSocketClient from "websocket"

function MultiplayerLayout() {
    const context = useContext(GameContext);
    const [userId, setUserId] = useState("")
    const [fetching, setFetching] = useState(true);
    const [room, setRoom] = useState({id: "", players: []})
    const [ready, setReady] = useState(false)
    useEffect(() => {
        http.createUser(context.username).then((id) => {
            setUserId(id)
            http.connect(id,()=>{setFetching(false)},(error)=>{console.log("error")},handleRoomMessage)

        })
    }, []);
    const handleCreateRoom = () => {
        setFetching(true)
        http.createRoom(userId);

    }
    const onCreatedRoom = (room) => {
        setRoom(room);
    }
    const handleRoomMessage = (message) => {
        const data = JSON.parse(message.body);
        if (data.type === "CREATED_ROOM") {
            let createdRoom = {
                id: data.room.id,
                players: [data.room.owner, ...data.room.players]
            }
            setRoom(createdRoom);
            setFetching(false)
        }else if(data.type==="JOINED_ROOM"){
            console.log("joined")
            const createdRoom={
                id:data.room.id,
                players: [data.room.owner,...data.room.players]
            }
            setRoom(createdRoom)
        }else if(data.type==="READY"){
            const createdRoom={
                id:data.room.id,
                players: [data.room.owner,...data.room.players]
            }
            setRoom(createdRoom)
        }

    }
    const handleReadyButtonClick=()=>{
        http.setReady(userId,room.id,!ready)
        setReady(prevState => !prevState)
    }
    const joinRoom=(code)=>{
        setFetching(true);
        http.joinRoom(userId,code)
    }
    return (
        <>
            {room.id === "" ? <JoinRoom joinRoom={joinRoom} fetching={fetching} createRoom={handleCreateRoom}></JoinRoom> :
                <RoomView handleReadyClick={handleReadyButtonClick} room={room} ready={ready}></RoomView>}
        </>)
}

export default MultiplayerLayout