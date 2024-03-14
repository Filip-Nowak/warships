import {createContext} from "react";

const GameContext=createContext({
    launchGame:(createdShips)=>{},
    createdShips:[],
    test:false,
    changeView:(viewName)=>{}
})
export default GameContext