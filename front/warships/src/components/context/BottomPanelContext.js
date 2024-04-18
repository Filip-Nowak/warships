import {createContext} from "react";

const BottomPanelContext=createContext({
    fields:[],
    handleSubmitShips:()=>{},
    remainingShips:0,
    showCancelButton:true,
    changeMode:(mode)=>{},
    cancelShipDeploy:()=>{}
})
export default BottomPanelContext