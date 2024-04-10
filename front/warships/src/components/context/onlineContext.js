import {createContext, useContext} from "react";

const OnlineContext=createContext({
    username:"",
    setUsername:(username)=>{},
    room:{
        id:"",
        players:[],
        ownerId:""
    },
    setRoom:()=>{},
})
export default OnlineContext