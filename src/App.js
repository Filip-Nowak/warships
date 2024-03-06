import WelcomeLayout from "./components/layouts/WelcomeLayout";
import {useRef, useState} from "react";
import ModeLayout from "./components/layouts/ModeLayout";
import GameCreatorLayout from "./components/layouts/GameCreatorLayout";
import "./styles/appContainer.css"
import GameLayout from "./components/game/gameLayout/GameLayout";
import GameContext from "./components/context/gameContext";

function App() {
  const[layout,setLayout]=useState("welcome")
  let nickname = useRef();
  const [mode, setMode] = useState()
  let content;
  const setModeLayout=(username)=>{
    setLayout("mode")
    nickname.current=username
  }
  const openGameCreator=(mode)=>{
    setMode(mode)
    document.body.style.backgroundColor="#090023"
    setLayout("gameCreator")
  }
  const startBotGame=()=>{
    document.body.style.backgroundColor="#1E6DE2"
    setLayout("botGame")
  }
  if(layout==="welcome")
  {
   content=<WelcomeLayout handleButtonClick={setModeLayout}></WelcomeLayout>
  }else if(layout==="mode"){
      content=<ModeLayout setMode={openGameCreator} nickname={nickname.current}></ModeLayout>
    }else if(layout==="gameCreator"){
    content=<GameCreatorLayout></GameCreatorLayout>
  }else if(layout ==="botGame"){
    content=<GameLayout></GameLayout>
  }

  // return (
  //   <div>
  //     <GameContext.Provider value={{startGame:startBotGame}}>
  //     {content}
  //     </GameContext.Provider>
  //     </div>
  //
  // );
  return <div>
    <GameLayout></GameLayout>
  </div>
}

export default App;
