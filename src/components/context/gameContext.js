import {createContext} from "react";

const GameContext=createContext({
    launchGame:(createdShips)=>{},
    createdShips:[],
    test:false
})
export default GameContext