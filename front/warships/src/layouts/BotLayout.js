import CreatorMenu from "../components/creator/creatorMenu/CreatorMenu";
import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router";
import Game from "../components/game/game/Game";
import BotGame from "../gameUtils.js/BotGame";

function BotLayout() {
    const [inGame, setInGame] = useState(false)
    const [playerFields, setPlayerFields] = useState([]);
    const navigate = useNavigate()
    const game=useRef(null)
    useEffect(() => {
        if(game.current!==null)
        {
            console.log("setting players")
            console.log(playerFields)
            game.current.setPlayerFields(playerFields)
        }
    }, [playerFields]);
    if(game.current!==null)
        console.log(game.current.playerFields)
    const submitShips = (fields) => {
        for(let i=0;i<fields.length;i++){
            for(let j=0;j<fields[i].length;j++){
                if(fields[i][j]===4)
                    fields[i][j]=0
            }
        }
        setPlayerFields(fields);
        setInGame(true)
        game.current=new BotGame(playerFields);
        game.current.startTimer()
    }
    const back = () => {
        navigate("/")
    }
    const returnToLobby=()=>{
        navigate("/")
    }
    return <>
        {
            !inGame ?
                <CreatorMenu back={back} submitShips={submitShips} online={false}/>
                :
                <Game game={game.current} playerFields={playerFields} setPlayerFields={setPlayerFields} startingPlayer={0} returnToLobby={returnToLobby}   />
        }
    </>
}

export default BotLayout