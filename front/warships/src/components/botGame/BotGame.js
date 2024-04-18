import GameView from "../game/game/GameView";
import {useState} from "react";

function BotGame({ships}){
    const [playerShips, setPlayerShips] = useState(ships)
    const [consoleFields, setConsoleFields] = useState()
    return <GameView />
}
export default BotGame