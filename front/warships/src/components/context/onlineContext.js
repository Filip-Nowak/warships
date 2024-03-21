import {createContext} from "react";

const OnlineContext=createContext({
    room:{roomId:"",players:[]},
    userId:""

})
export default OnlineContext