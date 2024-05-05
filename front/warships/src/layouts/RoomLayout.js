import {useNavigate, useParams} from "react-router";
import online from "../utils/online/Online";
import RoomView from "../components/room/roomView/RoomView";
import {useContext, useEffect, useRef, useState} from "react";
import OnlineContext from "../components/context/OnlineContext";
import CreatorMenu from "../components/creator/creatorMenu/CreatorMenu";
import MenuButton from "../components/utils/menuButton/MenuButton";
import Game from "../components/game/game/Game";
import OnlineGame from "../utils/game/OnlineGame";
import LoadingContext from "../components/context/LoadingContext";


function RoomLayout() {
    const [inRoom, setInRoom] = useState(true)
    const [inGame, setInGame] = useState(false)
    const [ready, setReady] = useState(false)
    const [fetching, setFetching] = useState(false)
    const [playerFields, setPlayerFields] = useState([])
    const [startingPlayer, setStartingPlayer] = useState("")
    const onlineContext = useContext(OnlineContext)
    const game = useRef(null);
    const navigate=useNavigate()
    const loadingContext = useContext(LoadingContext)
    const {roomId}=useParams();

    useEffect(() => {
        if (online.getRoomId() !== roomId) {
            onlineContext.setError("you are not in this room")
        }
        online.roomMessageHandlers = {}
        online.addRoomMessageHandler("JOINED_ROOM", onJoinRoom)
        online.addRoomMessageHandler("READY", onPlayerReady)
        online.addRoomMessageHandler("START", onStartCreator)
        online.addRoomMessageHandler("LAUNCH", onLaunch)
        online.addRoomMessageHandler("RETURN_TO_ROOM", handleReturnToLobby)
        online.addRoomMessageHandler("PLAYER_LEFT",onPlayerLeft)
        online.addRoomMessageHandler("NOT_READY",onNotReady)
        online.addRoomMessageHandler("BACK",onBack)
    }, []);

    console.log(inRoom)
    console.log("render")
    function onPlayerLeft(msg){
        loadingContext.setLoading(false)
        if(msg.message===online.getUserId()){
            online.setRoomId(null)
            navigate("/online/create-room")
            onlineContext.setRoom(null)
        }else{
            onlineContext.setRoom(prevState=>{
                prevState.users = prevState.users.filter(player=>player.id!==msg.message)
                prevState.ownerId=online.getRoomId()
                return {...prevState}
            })
            setInGame(prevInGame=>{
                if(!prevInGame){
                    setInRoom(prevState => {
                        if(!prevState){
                            setReady(false)
                        }
                        return true;
                    })
                }
                return prevInGame
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


    function onLaunch(msg) {
        console.log(onlineContext.room)
        let players;
        onlineContext.setRoom(prevState=>{
            players=prevState.users;
            return prevState;
        })
        setFetching(false)
        setInGame(true)
        setStartingPlayer(msg.message)
        game.current=new OnlineGame(players,onlineContext.setRoom,msg.message)
    }
    const onBack=()=>{
        setPlayerFields([])
        setInRoom(true)
        loadingContext.setLoading(false)
        setInGame(false)
    }

    function handleReturnToLobby(msg){
        setInRoom(true)
        setInGame(false)
        setReady(false)
        onlineContext.setRoom(msg.room)
        setStartingPlayer("")
        setPlayerFields([])
    }

    const setPlayerReady = () => {
        online.setReady(!ready)
        setReady(prevState => !ready)
    }
    const startCreator=()=>{
        online.startCreator();

    }
    const submitShips=(fields)=>{
        setFetching(true)
        if(playerFields.length!==0){
            return;
        }
        if(fields.length!==0)
        {
            for(let i=0;i<fields.length;i++){
                for(let j=0;j<fields[i].length;j++){
                    if(fields[i][j]===4) {
                        fields[i][j] = 0
                    }
                }
            }
            setPlayerFields(fields);
        }
        online.submitShips(fields)
    }
    const leave=()=>{
        setFetching(true)
        online.leave();
    }
    const returnToRoom=()=>{
        console.log(inGame)
        setInRoom(true)
        setInGame(false)
        setReady(false)
        setStartingPlayer("")
        setPlayerFields([])
    }
    console.log(inGame)
    const back=()=>{
        online.back();
    }
    return (
        <>
            {roomId===online.getRoomId()?
            inRoom?
                <>
                <MenuButton message={"leave"} handleClick={leave}></MenuButton>
                <RoomView handleReadyClick={setPlayerReady} startGame={startCreator} ready={ready}></RoomView></>
                :
                !inGame?<CreatorMenu back={back} online={true} submitShips={submitShips} ></CreatorMenu>
                    :
                    <Game game={game.current} returnToLobby={returnToRoom} startingPlayer={startingPlayer} setPlayerFields={setPlayerFields} playerFields={playerFields}></Game>

            :""}</>

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