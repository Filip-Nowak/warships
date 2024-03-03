import WelcomeLayout from "./components/layouts/WelcomeLayout";
import {useRef, useState} from "react";
import ModeLayout from "./components/layouts/ModeLayout";
import GameCreatorLayout from "./components/layouts/GameCreatorLayout";
import "./styles/appContainer.css"

function App() {
  const[layout,setLayout]=useState("welcome")
  let nickname = useRef();
  let mode = useRef();
  let content;
  const setModeLayout=(username)=>{
    setLayout("mode")
    nickname.current=username
  }
  const openGameCreator=(mode)=>{
    mode.current=mode;
    document.body.style.backgroundColor="#090023"
    setLayout("gameCreator")
  }
  if(layout==="welcome")
  {
   content=<WelcomeLayout handleButtonClick={setModeLayout}></WelcomeLayout>
  }else if(layout==="mode"){
      content=<ModeLayout setMode={openGameCreator} nickname={nickname.current}></ModeLayout>
    }else if(layout==="gameCreator"){
    content=<GameCreatorLayout></GameCreatorLayout>
  }

  return (
    <div>
      {content}
      </div>

  );
}

export default App;
