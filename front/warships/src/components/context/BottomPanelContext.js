import {createContext} from "react";

const BottomPanelContext=createContext({
    ships:[],
    handleSubmitShips:()=>{},
    remainingShips:0,
    showCancelButton:true,
    changeMode:(mode)=>{},
    cancelShipDeploy:()=>{}
})
export default BottomPanelContext