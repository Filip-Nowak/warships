import {createContext} from "react";

const CreatedShipsContext=createContext({
    ships:[],
    handleSubmitShips:()=>{}
})
export default CreatedShipsContext