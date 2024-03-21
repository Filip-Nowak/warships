import {useEffect, useState} from "react";
import OnlineGame from "../../http/OnlineGame";
import OnlineContext from "../context/onlineContext";
import CreatorMenu from "../creator/creatorMenu/CreatorMenu";

function OnlineLayout({userId,room}){
    const [onlineGame, setOnlineGame] = useState()
    useEffect(() => {
        const game=new OnlineGame(userId,room)
        setOnlineGame(game)
    }, []);
    const submitShips=(ships)=>{
        onlineGame.submitShips(ships);
    }
    return <OnlineContext.Provider value={{room:room,userId: userId}}>
        <CreatorMenu submitShips={submitShips} online={true}></CreatorMenu>
    </OnlineContext.Provider>
}
export default OnlineLayout;