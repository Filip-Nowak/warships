import Board from "../../board/board/Board";
import ShipSelector from "../../utils/shipSelector/ShipSelector";
import boardFactory from "../../utils/board/boardFactory";
import ShipSelectorContext from "../../context/ShipSelectorContext"

function MainPanel({handleFieldClick, ships, removeMode, deployingShip, selectedShip, selectShip, shipsLeft}) {
    return <div style={{display: "flex", marginTop: "1rem"}}>
        <Board handleFieldClick={handleFieldClick}
               boardInfo={boardFactory.getCreatorBoard(ships, !removeMode && selectedShip === 0, removeMode, deployingShip)}/>
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