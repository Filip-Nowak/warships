import {over} from "stompjs"
import SockJS from "sockjs-client"
import {useRef} from "react";
import submitInput from "../components/utils/SubmitInput/SubmitInput";
const http={
    userId:"",
    roomId:"",
    createRoom:createRoom,
    createUser:createUser,
    connect:connect,
    stompClient:null,
    joinRoom:joinRoom,
    setReady:setReady,
    openRoomWs:openRoomWs,
    openGameWs:openGameWs,
    startGame:startGame,
    submitShips:submitShips
}
async function createUser(username){
    const body=JSON.stringify({nickname:username,id:"",roomId:""});
    console.log(body)
    const response=await fetch("http://localhost:8080/createUser",{
        method:"POST",
        body:body,
        headers:{
            "Content-Type":"application/json"
        }
    })
    const data= await response.json();
    console.log(data)
    http.userId=data.user.id;
    return data.user.id;
}
async function connect(onConnected,onError){
    if(http.stompClient===null){
        let socket=new SockJS("http://localhost:8080/ws")
        http.stompClient=over(socket);
    }
    const handleConnect=()=>{
        console.log("connected");
        onConnected()
    }
    await http.stompClient.connect({},handleConnect,onError)
}
async function openRoomWs(onConnected,onError,handleRoomMessage){
    const handleConnect=()=>{
        http.stompClient.subscribe("/user/"+http.userId+"/room",handleRoomMessage)
        onConnected();
    }
    await http.connect(handleConnect,onError,handleRoomMessage)
}
async function openGameWs(onConnected,onError,handleGameLog){
    const handleConnect=()=>{
        http.stompClient.subscribe("/user/"+http.userId+"/game",handleGameLog)
        onConnected();
    }
    await http.connect(handleConnect,onError,handleGameLog)
}
async function createRoom(){
    http.stompClient.send("/app/createRoom",{},JSON.stringify({senderId:http.userId,roomId:"",message:""}))
}

function joinRoom(roomId){
    const msg=JSON.stringify({senderId:http.userId,roomId:roomId})
    console.log("joining")
    http.roomId=roomId
    http.stompClient.send("/app/joinRoom",{},msg)
}
function setReady(value){
    const msg=JSON.stringify({senderId:http.userId,message:value,roomId:http.roomId})
    //http.stompClient.send("/app/ready",{},msg);
    http.stompClient.send("/app/ready",{},msg);
}
function startGame(){
    const msg=JSON.stringify({senderId:http.userId,roomId:http.roomId})
    http.stompClient.send("/app/start",{},msg)
}
function submitShips(shipsFilled){
    if(shipsFilled){
        sendLog("SUBMIT_SHIPS")
    }else{
        sendLog("NO_SHIPS")
    }
}
function sendLog(type,pos){
    const log={
        roomId:http.roomId,
        senderId:http.userId,
        type:type,
        pos:pos
    }
    http.stompClient.send("/app/game",{},log)
}
export default http;