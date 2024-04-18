import {createContext} from "react";

const ShipSelectorContext=createContext({
    selectShip:()=>{},
    selectedShip:0,
    shipsLeft:[],
    disabled:true
});
export default ShipSelectorContext