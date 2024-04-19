import GameView from "../game/game/GameView";
import {useRef, useState} from "react";
import BotEnemy from "../../gameUtils.js/BotEnemy";

function BotGame({playerFields,setPlayerFields}){
    const [consoleFields, setConsoleFields] = useState()
    const enemy = useRef(new BotEnemy())

    return <GameView />
}
export default BotGame