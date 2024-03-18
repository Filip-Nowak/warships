import WelcomeLayout from "./components/layouts/WelcomeLayout";
import {useState} from "react";
import ModeLayout from "./components/layouts/ModeLayout";
import GameCreatorLayout from "./components/layouts/GameCreatorLayout";
import GameLayout from "./components/game/gameLayout/GameLayout";
import GameContext from "./components/context/gameContext";
import MultiplayerLayout from "./components/layouts/MultiplayerLayout";
import "./App.css"

function App() {
    const [layout, setLayout] = useState("welcome")
    const [username, setUsername] = useState()
    const [mode, setMode] = useState()
    const [playerShips, setPlayerShips] = useState()
    let content;
    const setModeLayout = (username) => {
        setLayout("mode")
        setUsername(username)
    }
    const openGameCreator = (mode) => {
        setMode(mode)
        document.body.style.backgroundColor = "#090023"
        setLayout("gameCreator")
    }
    const changeView=(viewName)=>{
        setLayout(viewName);
        console.log("Xd")
    }
    const startBotGame = () => {
        document.body.style.backgroundColor = "#1E6DE2"
        setLayout("botGame")
    }
    if (layout === "welcome") {
        content = <WelcomeLayout handleButtonClick={setModeLayout}></WelcomeLayout>
    } else if (layout === "mode") {
        content = <ModeLayout setMode={openGameCreator}></ModeLayout>
    } else if (layout === "gameCreator") {
        content = <GameCreatorLayout></GameCreatorLayout>
    } else if (layout === "botGame") {
        content = <GameLayout createdShips={playerShips}></GameLayout>
    }else if(layout === "multiplayer"){
        content = <MultiplayerLayout username={username}></MultiplayerLayout>
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
        console.log("launched")
        console.log(createdShips)
        setPlayerShips(createdShips);
        document.body.style.backgroundColor="#1E6DE2"
        setLayout("botGame")
    }
    return <div>
        <GameContext.Provider value={{launchGame:launchGame,test: ["xd"],changeView:changeView,setUsername:setUsername,username: username}}>
        {/*<GameLayout createdShips={testShips}></GameLayout>*/}
            {content}
        </GameContext.Provider>
    </div>
}

export default App;
