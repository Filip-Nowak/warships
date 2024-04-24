import {useNavigate, useParams} from "react-router";
import online from "../gameUtils.js/Online";
import RoomView from "../components/room/roomView/RoomView";
import {useContext, useEffect, useRef, useState} from "react";
import OnlineContext from "../components/context/OnlineContext";
import OnlineCreator from "../components/online/OnlineCreator";
import CreatorMenu from "../components/creator/creatorMenu/CreatorMenu";
import GameView from "../components/game/game/GameView";
import OnlineGame2 from "../components/online/OnlineGame2";
import MenuButton from "../components/utils/menuButton/MenuButton";
import Game from "../components/game/game/Game";
import getEmptyFields from "../components/utils/getEmptyFields";
import OnlineGame from "../gameUtils.js/OnlineGame";

function RoomLayout() {
    const [inRoom, setInRoom] = useState(true)
    const [inGame, setInGame] = useState(false)
    const [ready, setReady] = useState(false)
    const [fetching, setFetching] = useState(false)
    const [playerFields, setPlayerFields] = useState(getEmptyFields())
    const [startingPlayer, setStartingPlayer] = useState("")
    const onlineContext = useContext(OnlineContext)
    const game = useRef(null);
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
            navigate("/online/create-room")
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
        console.log(onlineContext.room)
        setFetching(false)
        setInGame(true)
        setStartingPlayer(msg.message)
        game.current=new OnlineGame(onlineContext.room.users)
    }
    const onBack=()=>{
        setPlayerFields(getEmptyFields())
        setInRoom(true)
    }

    function handleReturnToLobby(msg){
        setInRoom(true)
        setInGame(false)
        setReady(false)
        onlineContext.setRoom(msg.room)
        setStartingPlayer("")
        setPlayerFields(getEmptyFields())
    }

    const setPlayerReady = () => {
        online.setReady(!ready)
        setReady(prevState => !ready)
    }
    const startCreator=()=>{
        online.startCreator();

    }
    const submitShips=(fields)=>{
        for(let i=0;i<fields.length;i++){
            for(let j=0;j<fields[i].length;j++){
                if(fields[i][j]===4)
                    fields[i][j]=0
            }
        }
        setPlayerFields(fields);
        online.submitShips(fields)
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
        setPlayerFields(getEmptyFields())
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
                    <Game game={game.current} returnToLobby={returnToRoom} startingPlayer={startingPlayer} setPlayerFields={setPlayerFields} playerFields={playerFields}></Game>

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