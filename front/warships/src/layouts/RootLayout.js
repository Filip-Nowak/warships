import {Outlet} from "react-router";
import UsernameContext from "../components/context/OnlineContext";
import {useEffect, useState} from "react";
import online from "../http/Online";

function RootLayout(){
    const [username, setUsername] = useState("")
    const [room, setRoom] = useState({})
    return <UsernameContext.Provider value={{username:username,setUsername:setUsername,room: room,setRoom:setRoom}}>
        <Outlet/>
    </UsernameContext.Provider>
}
export default RootLayout