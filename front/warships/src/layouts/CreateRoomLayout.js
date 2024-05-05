import JoinRoom from "../components/room/joinRoom/JoinRoom";
import online from "../utils/online/Online";
import {useContext, useEffect, useState} from "react";
import OnlineContext from "../components/context/OnlineContext";
import {useNavigate} from "react-router";
import Online from "../utils/online/Online";
import MenuButton from "../components/utils/menuButton/MenuButton";
import RoomNotFoundError from "../components/errors/RoomNotFoundError";
import LoadingContext from "../components/context/LoadingContext";

function CreateRoomLayout() {
    const onlineContext = useContext(OnlineContext);
    const navigate = useNavigate()
    const [displayError, setDisplayError] = useState(false)
    const loadingContext=useContext(LoadingContext)
    useEffect(() => {
        loadingContext.setLoading(true)
        connect();
    }, []);
    const onConnected = () => {
        online.addRoomMessageHandler("JOINED_ROOM", onJoinRoom)
        online.addRoomMessageHandler("ERROR",handleError)
        loadingContext.setLoading(false)
    }
    const handleError=()=>{
        console.log("handled error")
        loadingContext.setLoading(false)
        setDisplayError(true)
        setTimeout(()=>{
            setDisplayError(false)
        },2000)
    }
    const joinRoom = (code) => {
        loadingContext.setLoading(true)
        online.joinRoom(code)
    }
    const onJoinRoom = (msg) => {
        loadingContext.setLoading(false)
        const room=JSON.parse(msg.message)
        console.log(room)
        onlineContext.setRoom(room)
        online.setRoomId(room.id);
        navigate("/online/room/" + room.id)
        console.log("created")
    }
    const createRoom = () => {
        loadingContext.setLoading(true)
        online.createRoom()
    }


    async function connect() {
        if (online.getUserId() === null) {
            let error=false;
            await online.createUser(onlineContext.username).catch(e=>{error=true;onlineContext.setError("couldn't connect to server")})
            if(!error)
                await online.connect(onlineContext.username, onConnected,onlineContext.setError)
        } else {
            loadingContext.setLoading(false)
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
    {displayError?<RoomNotFoundError/>:""}
        <MenuButton message={"back"} handleClick={deleteSession}></MenuButton>
        <JoinRoom  createRoom={createRoom} joinRoom={joinRoom}></JoinRoom>
    </>
}

export default CreateRoomLayout