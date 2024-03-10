import {createContext} from "react";

const GameContext=createContext({
    launchGame:(createdShips)=>{},
    createdShips:[]
})
export default GameContext