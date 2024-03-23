import {useContext, useEffect, useState} from "react";
import OnlineGame from "../../http/OnlineGame";
import OnlineContext from "../context/onlineContext";
import CreatorMenu from "../creator/creatorMenu/CreatorMenu";
import GameContext from "../context/gameContext";

function OnlineLayout({userId,room}){
    const context=useContext(GameContext);
    const [onlineGame, setOnlineGame] = useState(new OnlineGame(userId,room))
    const submitShips=(ships)=>{
        console.log("xddd")
        onlineGame.submitShips(ships);
    }
    const handleNoShips=(user)=>{
        context.changeView("multiplayer")
    }
    return <OnlineContext.Provider value={{room:room,userId: userId}}>
        <CreatorMenu submitShips={submitShips} online={true}></CreatorMenu>
    </OnlineContext.Provider>
}
export default OnlineLayout;