import {createContext} from "react";

const GameContext=createContext({
    launchGame:(createdShips)=>{},
    test:[],
    changeView:(viewName)=>{},
    setUsername:username=>{},
    username:""
})
export default GameContext