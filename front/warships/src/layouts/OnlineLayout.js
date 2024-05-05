import OnlineContext from "../components/context/OnlineContext";
import {Outlet} from "react-router";
import {useState} from "react";
import ServerError from "../components/errors/ServerError";

function OnlineLayout({username,setUsername}){
    const [room, setRoom] = useState({})
    const [error, setError] = useState(null)
    console.log(username)
    return<>
        <OnlineContext.Provider value={{username: username,setUsername:setUsername,room: room,setRoom:setRoom,setError:setError}}>
            {error?
                <ServerError message={error}/>
                :
                <Outlet/>
            }
        </OnlineContext.Provider>
    </>
}
export default OnlineLayout