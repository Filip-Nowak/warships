import WelcomeLayout from "./components/layouts/WelcomeLayout";
import {useRef, useState} from "react";
import ModeLayout from "./components/layouts/ModeLayout";
import GameCreatorLayout from "./components/layouts/GameCreatorLayout";
import "./styles/appContainer.css"
import GameLayout from "./components/game/gameLayout/GameLayout";
import GameContext from "./components/context/gameContext";

function App() {
    const [layout, setLayout] = useState("welcome")
    let nickname = useRef();
    const [mode, setMode] = useState()
    const [playerShips, setPlayerShips] = useState()
    let content;
    const setModeLayout = (username) => {
        setLayout("mode")
        nickname.current = username
    }
    const openGameCreator = (mode) => {
        setMode(mode)
        document.body.style.backgroundColor = "#090023"
        setLayout("gameCreator")
    }
    const startBotGame = () => {
        document.body.style.backgroundColor = "#1E6DE2"
        setLayout("botGame")
    }
    if (layout === "welcome") {
        content = <WelcomeLayout handleButtonClick={setModeLayout}></WelcomeLayout>
    } else if (layout === "mode") {
        content = <ModeLayout setMode={openGameCreator} nickname={nickname.current}></ModeLayout>
    } else if (layout === "gameCreator") {
        content = <GameCreatorLayout></GameCreatorLayout>
    } else if (layout === "botGame") {
        content = <GameLayout createdShips={playerShips}></GameLayout>
    }

    // return (
    //   <div>
    //     <GameContext.Provider value={{startGame:startBotGame}}>
    //     {content}
    //     </GameContext.Provider>
    //     </div>
    //
    // );
    const testShips = [
        {
            fields: [
                {pos: {x: 1, y: 1}, hit: false}, {pos: {x: 2, y: 1}, hit: false}, {pos: {x: 2, y: 2}, hit: false}, {pos: {x: 3, y: 2}, hit: false}
            ], sunken: false
        },
        {
            fields:[
                {pos:{x:5,y:5},hit:false}
            ],sunken:false
        },
        {
            fields:[
                {pos:{x:0,y:9},hit:false},
                {pos:{x:1,y:9},hit:false}
            ],
            sunken:false
        }
    ]
    const launchGame=(createdShips)=>{
        setPlayerShips(createdShips);
        setLayout("botGame")
    }
    return <div>
        <GameContext.Provider value={{launchGame:launchGame}}>
        {content}
        </GameContext.Provider>
    </div>
}

export default App;
