import {useNavigate, useParams} from "react-router";
import online from "../http/Online";
import RoomView from "../components/room/roomView/RoomView";
import {useContext, useEffect, useState} from "react";
import OnlineContext from "../components/context/OnlineContext";
import OnlineCreator from "../components/online/OnlineCreator";
import CreatorMenu from "../components/creator/creatorMenu/CreatorMenu";
import GameView from "../components/game/game/GameView";
import OnlineGame from "../components/online/OnlineGame";
import MenuButton from "../components/utils/menuButton/MenuButton";

function RoomLayout() {
    const [inRoom, setInRoom] = useState(true)
    const [inGame, setInGame] = useState(false)
    const [ready, setReady] = useState(false)
    const [fetching, setFetching] = useState(false)
    const [ships, setShips] = useState([])
    const [startingPlayer, setStartingPlayer] = useState("")
    const onlineContext = useContext(OnlineContext)
    const navigate=useNavigate()

    useEffect(() => {
        online.roomMessageHandlers = {}
        online.addRoomMessageHandler("JOINED_ROOM", onJoinRoom)
        online.addRoomMessageHandler("READY", onPlayerReady)
        online.addRoomMessageHandler("START", onStartCreator)
        online.addRoomMessageHandler("NO_SHIPS", onNoShips)
        online.addRoomMessageHandler("LAUNCH", onLaunch)
        online.addRoomMessageHandler("RETURN_TO_ROOM", handleReturnToLobby)
        online.addRoomMessageHandler("PLAYER_LEFT",onPlayerLeft)
        online.addRoomMessageHandler("NOT_READY",onNotReady)
        online.addRoomMessageHandler("BACK",onBack)
    }, []);

    console.log(inRoom)
    console.log("render")
    function onPlayerLeft(msg){
        console.log("player left ")
        console.log(msg)
        if(msg.message===online.getUserId()){
            console.log("you left")
            online.setRoomId(null)
            navigate("/create-room")
            setFetching(false)
            onlineContext.setRoom(null)
        }else{
            onlineContext.setRoom(prevState=>{
                prevState.users = prevState.users.filter(player=>player.id!==msg.message)
                prevState.ownerId=online.getRoomId()
                return {...prevState}
            })
            setFetching(false)
            setInRoom(prevState => {
                if(!prevState && !inGame){
                    console.log("chuj")
                    setReady(false)
                }
                return true;
            })
        }

    }
    function onNotReady(msg) {
        onlineContext.setRoom(prevState=>{
            const room={...prevState}
            for(let i=0;i<room.users.length;i++){
                if(room.users[i].id===msg.message){
                    room.users[i].ready=false;
                    return room
                }
            }
        })
    }

    function onJoinRoom(msg) {
        onlineContext.setRoom(JSON.parse(msg.message))
    }

    function onPlayerReady(msg) {
        console.log(msg.message)
        onlineContext.setRoom(prevState=>{
            console.log(prevState)
            const room={...prevState}
            for(let i=0;i<room.users.length;i++){
                if(room.users[i].id===msg.message){
                    room.users[i].ready=true;
                    console.log()
                    return room
                }
            }
        })
    }

    function onStartCreator() {
        console.log("started")
        console.log(onlineContext.room)
        onlineContext.setRoom(prevState=>{
            prevState.users.forEach(player=>{
                player.ready=false;
            })
            return {...prevState}
        })
        setFetching(false)
        setReady(false)
        setInRoom(false)
    }

    function onNoShips() {

    }

    function onLaunch(msg) {
        setFetching(false)
        setInGame(true)
        setStartingPlayer(msg.message)
    }
    const onBack=()=>{
        setShips([])
        setInRoom(true)
    }

    function handleReturnToLobby(msg){
        setInRoom(true)
        setInGame(false)
        setReady(false)
        onlineContext.setRoom(msg.room)
        setStartingPlayer("")
        setShips([])
    }

    const setPlayerReady = () => {
        online.setReady(!ready)
        setReady(prevState => !ready)
    }
    const startCreator=()=>{
        online.startCreator();

    }
    const submitShips=(ships)=>{
        online.submitShips(ships)
        setShips(ships)
        setFetching(true)
    }
    const leave=()=>{
        setFetching(true)
        online.leave();
    }
    const returnToRoom=()=>{
        setInRoom(true)
        setInGame(false)
        setReady(false)
        setStartingPlayer("")
        setShips([])
    }
    const back=()=>{
        online.back();
    }
    return (
        <>
            {inRoom?
                <>
                <MenuButton message={"leave"} handleClick={leave}></MenuButton>
                <RoomView handleReadyClick={setPlayerReady} startGame={startCreator} ready={ready}></RoomView></>
                :
                !inGame?<CreatorMenu back={back} online={true} submitShips={submitShips} fetching={fetching}></CreatorMenu>
                    :
                    <OnlineGame returnToLobby={returnToRoom} createdShips={ships} players={onlineContext.room.users} startingPlayer={startingPlayer}  ></OnlineGame>
            }</>

    )
}

export const roomLoader = ({params}) => {
    const {roomId} = params;
    if (online.getRoomId() !== roomId) {
        console.log("error")
        throw new Error("you are not in this room")
    }
    return null
}
export default RoomLayout