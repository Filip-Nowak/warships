import JoinRoom from "../components/room/joinRoom/JoinRoom";
import online from "../http/Online";
import {useContext, useEffect, useState} from "react";
import OnlineContext from "../components/context/OnlineContext";
import {useNavigate} from "react-router";

function CreateRoomLayout(){
    const [fetching, setFetching] = useState(true)
    const onlineContext=useContext(OnlineContext);
    const navigate=useNavigate()
    useEffect(() => {
        connect();
    }, []);
    // const onConnected = (frame) => {
    //     online.createUser().then((userId)=>{
    //         // online.addRoomMessageHandler("ROOM_CREATED",onCreatedRoom)
    //         online.addRoomMessageHandler("JOINED_ROOM",onJoinRoom)
    //         setFetching(false)
    //     })
    const onConnected =()=>{
        online.addRoomMessageHandler("JOINED_ROOM",onJoinRoom)
        setFetching(false)
    }
    const joinRoom=(code)=>{
        setFetching(true)
        online.joinRoom(code)
    }
    const onJoinRoom=(msg)=>{
        setFetching(false)
        onlineContext.setRoom(msg.room)
        online.setRoomId(msg.room.id)
        navigate("/room/"+msg.room.id)
        console.log("created")
    }
    const createRoom=()=>{
        setFetching(true)
        online.createRoom()}
    const onError = (e) => {
        console.log("error")
        console.log(e)
    }
    async function connect(){
        const userId=await online.createUser(onlineContext.username)
        await online.connect(onlineContext.username,onConnected,onError)

    }
    return <JoinRoom fetching={fetching} createRoom={createRoom} joinRoom={joinRoom}></JoinRoom>
}
export default CreateRoomLayout