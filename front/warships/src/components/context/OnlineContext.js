import {createContext} from "react";

const OnlineContext=createContext({
    username:"",
    setUsername:(username)=>{},
    room:{
        id:"",
        users:[{id:"",nickname:"",ready:""}],
        ownerId:"",
    },
    setError:(prevState)=>{},
    setRoom:(room)=>{},
})
export default OnlineContext