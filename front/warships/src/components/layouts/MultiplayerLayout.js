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
    const [room, setRoom] = useState({id: "", players: []})
    useEffect(() => {
        http.createUser(context.username).then((id) => {
            setUserId(id)
        })
    }, []);
    const handleCreateRoom = () => {
        setFetching(true)
        console.log("user:" + userId)
        // http.createRoom(userId).then(createdRoom=>{
        //     setRoom(createdRoom);
        //     setFetching(false);
        // })
        http.connect(userId, () => {
            setFetching(false);
            console.log("connected!!!")
            http.stompClient.subscribe("/user/"+userId+"/room",handleRoomMessage)
            http.createRoom(userId)

        }, (error) => {
            console.log("error")
        }, handleRoomMessage)

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
        }
    }
    return (
        <>
            {room.id === "" ? <JoinRoom fetching={fetching} createRoom={handleCreateRoom}></JoinRoom> :
                <RoomView room={room}></RoomView>}
        </>)
}

export default MultiplayerLayout