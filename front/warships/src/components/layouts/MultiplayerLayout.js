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
    const [fetching, setFetching] = useState(false);
    const [room, setRoom] = useState({id:"",players:[]})
    useEffect(() => {
        http.createUser(context.username).then((id)=>{
            setUserId(userId)
        })
    }, []);
    const handleCreateRoom = () => {
        setFetching(true)
        http.createRoom(userId).then(createdRoom=>{
            setRoom(createdRoom);
            setFetching(false);
        })
    }

    return (
        <>
            {room.id===""?<JoinRoom fetching={fetching} createRoom={handleCreateRoom}></JoinRoom>:<RoomView room={room}></RoomView>}
        </>)
}

export default MultiplayerLayout