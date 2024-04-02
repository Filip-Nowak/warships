import online from "../../../http/Online";
import {useEffect, useState} from "react";
import onlineGame from "../../online/OnlineGame";

function Test({start}){
    console.log(start)
    console.log(online.getUserId())
    console.log(start===online.getUserId())
    const [playerTurn, setPlayerTurn] = useState(start===online.getUserId())
    const [counter, setCounter] = useState(0)
    useEffect(() => {
        online.addGameLogHandler("TEST",handleStartTurn)
        online.addGameLogHandler("MOVE", handleMove)
    }, []);
    const handleStartTurn=(msg)=>{
        console.log("changing "+online.getUserId()+" to "+msg.senderId+" "+(msg.senderId===online.getUserId()).toString())
        console.log(counter)
        setPlayerTurn(msg.senderId===online.getUserId())
    }
    const changeState=(msg)=>{
        setPlayerTurn(prevState => {
            return {...prevState,turn:msg.senderId===online.getUserId()}
        })
        setCounter(prevState => {
            console.log(prevState)
            return prevState+1
        })
    }
    const handleMove=(msg)=>{
        console.log("move")

    }
    const handleClick=()=>{
        online.sendMove()
    }


    return <div>
        <div>player id: {online.getUserId()}</div>
        <div>turn </div>
        <button onClick={handleClick} disabled={!playerTurn}>move</button>
    </div>
}
export default Test