import OnlineContext from "../components/context/OnlineContext";
import {Outlet} from "react-router";
import {useState} from "react";

function OnlineLayout({username,setUsername}){
    const [room, setRoom] = useState({})
    console.log(username)
    return<>
        <OnlineContext.Provider value={{username: username,setUsername:setUsername,room: room,setRoom:setRoom}}>
            <Outlet/>
        </OnlineContext.Provider>
    </>
}
export default OnlineLayout