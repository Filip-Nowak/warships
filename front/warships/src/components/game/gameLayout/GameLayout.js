import GameView from "../game/GameView";
function GameLayout({createdShips}){
    return <div>
        <GameView createdShips={createdShips}></GameView>
    </div>
}
export default GameLayout;