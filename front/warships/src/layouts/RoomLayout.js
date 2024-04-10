import {useParams} from "react-router";
import online from "../http/Online";
import RoomView from "../components/room/roomView/RoomView";
import {useContext, useEffect, useState} from "react";
import OnlineContext from "../components/context/OnlineContext";
import OnlineCreator from "../components/online/OnlineCreator";
import CreatorMenu from "../components/creator/creatorMenu/CreatorMenu";
import GameView from "../components/game/game/GameView";
import OnlineGame from "../components/online/OnlineGame";
import createdShipsContext from "../components/context/createdShipsContext";

function RoomLayout() {
    const [inRoom, setInRoom] = useState(true)
    const [inGame, setInGame] = useState(false)
    const [ready, setReady] = useState(false)
    const [fetching, setFetching] = useState(false)
    const [ships, setShips] = useState([])
    const [startingPlayer, setStartingPlayer] = useState("")
    const onlineContext = useContext(OnlineContext)

    useEffect(() => {
        online.roomMessageHandlers = {}
        online.addRoomMessageHandler("JOINED_ROOM", onJoinRoom)
        online.addRoomMessageHandler("READY", onPlayerReady)
        online.addRoomMessageHandler("START", onStartCreator)
        online.addRoomMessageHandler("NO_SHIPS", onNoShips)
        online.addRoomMessageHandler("LAUNCH", onLaunch)
        online.addRoomMessageHandler("RETURN_TO_ROOM", handleReturnToLobby)
        online.addRoomMessageHandler("PLAYER_LEFT",onPlayerLeft)
    }, []);

    function onPlayerLeft(msg){
        onlineContext.setRoom(msg.room)
        if(!inRoom){
            if(inGame){

            }else{
                setInRoom(true)
            }
        }
    }

    function onJoinRoom(msg) {
        onlineContext.setRoom(msg.room)
    }

    function onPlayerReady(msg) {
        onlineContext.setRoom(msg.room)
    }

    function onStartCreator() {
        setInRoom(false)
    }

    function onNoShips() {

    }

    function onLaunch(msg) {
        setFetching(false)
        setInGame(true)
        setStartingPlayer(msg.userId)
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
    return (
        <>
            {inRoom?
                <RoomView handleReadyClick={setPlayerReady} startGame={startCreator} ready={ready}></RoomView>
                :
                !inGame?<CreatorMenu online={true} submitShips={submitShips} fetching={fetching}></CreatorMenu>
                    :
                    <OnlineGame createdShips={ships} players={onlineContext.room.players} startingPlayer={startingPlayer}  ></OnlineGame>
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