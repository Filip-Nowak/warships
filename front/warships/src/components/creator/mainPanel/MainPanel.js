import Board from "../../board/board/Board";
import ShipSelector from "../../utils/shipSelector/ShipSelector";
import boardFactory from "../../utils/board/boardFactory";
import ShipSelectorContext from "../../context/ShipSelectorContext"

function MainPanel({handleFieldClick, removeMode, deployingShip, selectedShip, selectShip, shipsLeft,fields}) {
    console.log(boardFactory.getCreatorBoard( !removeMode && selectedShip === 0, removeMode, deployingShip))
    return <div style={{display: "flex", marginTop: "1rem"}}>
        <Board handleFieldClick={handleFieldClick}
               boardInfo={boardFactory.getCreatorBoard( !removeMode && selectedShip === 0, removeMode, deployingShip)} fields={fields}/>
        <ShipSelectorContext.Provider value={{
            selectShip: selectShip,
            shipsLeft: shipsLeft,
            selectedShip: selectedShip,
            disabled: removeMode || (!removeMode && deployingShip.length !== 0)
        }}>
            <ShipSelector/>
        </ShipSelectorContext.Provider>
    </div>
}

export default MainPanel