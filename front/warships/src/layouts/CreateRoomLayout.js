import JoinRoom from "../components/room/joinRoom/JoinRoom";
import online from "../http/Online";
import {useContext, useEffect, useState} from "react";
import OnlineContext from "../components/context/OnlineContext";
import {useNavigate} from "react-router";
import Online from "../http/Online";
import MenuButton from "../components/utils/menuButton/MenuButton";

function CreateRoomLayout() {
    const [fetching, setFetching] = useState(true)
    const onlineContext = useContext(OnlineContext);
    const navigate = useNavigate()
    useEffect(() => {
        connect();
    }, []);
    // const onConnected = (frame) => {
    //     online.createUser().then((userId)=>{
    //         // online.addRoomMessageHandler("ROOM_CREATED",onCreatedRoom)
    //         online.addRoomMessageHandler("JOINED_ROOM",onJoinRoom)
    //         setFetching(false)
    //     })
    const onConnected = () => {
        online.addRoomMessageHandler("JOINED_ROOM", onJoinRoom)
        setFetching(false)
    }
    const joinRoom = (code) => {
        setFetching(true)
        online.joinRoom(code)
    }
    const onJoinRoom = (msg) => {
        setFetching(false)
        const room=JSON.parse(msg.message)
        console.log(room)
        onlineContext.setRoom(room)
        online.setRoomId(room.id);
        navigate("/room/" + room.id)
        console.log("created")
    }
    const createRoom = () => {
        setFetching(true)
        online.createRoom()
    }
    const onError = (e) => {
        console.log("error")
        console.log(e)
    }

    async function connect() {
        if (online.getUserId() === null) {
            await online.createUser(onlineContext.username)
            await online.connect(onlineContext.username, onConnected, onError)
        } else {
            setFetching(false)
            online.roomMessageHandlers = {}
            online.addRoomMessageHandler("JOINED_ROOM", onJoinRoom)
        }

    }
    const deleteSession=()=>{
        online.deleteSession()
        navigate("/")
        onlineContext.setRoom(null)
    }
    return <>
        <MenuButton message={"back"} handleClick={deleteSession}></MenuButton>
        <JoinRoom fetching={fetching} createRoom={createRoom} joinRoom={joinRoom}></JoinRoom>
    </>
}

export default CreateRoomLayout