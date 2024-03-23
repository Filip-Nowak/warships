import {useEffect, useState} from "react";
import OnlineGame from "../../http/OnlineGame";
import OnlineContext from "../context/onlineContext";
import CreatorMenu from "../creator/creatorMenu/CreatorMenu";

function OnlineLayout({userId,room}){
    const [onlineGame, setOnlineGame] = useState(new OnlineGame(userId,room))
    const submitShips=(ships)=>{
        onlineGame.submitShips(ships);
    }
    return <OnlineContext.Provider value={{room:room,userId: userId}}>
        <CreatorMenu submitShips={submitShips} online={true}></CreatorMenu>
    </OnlineContext.Provider>
}
export default OnlineLayout;