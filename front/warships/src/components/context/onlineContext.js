import {createContext, useContext} from "react";

const OnlineContext=createContext({
    username:"",
    setUsername:(username)=>{},
    room:{
        id:"",
        users:[{id:"",nickname:"",ready:""}],
        ownerId:""
    },
    setRoom:(room)=>{},
})
export default OnlineContext