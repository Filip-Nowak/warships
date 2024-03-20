import {over} from "stompjs"
import SockJS from "sockjs-client"
import {useRef} from "react";
const http={
    createRoom:createRoom,
    createUser:createUser,
    connect:connect,
    stompClient:null,
    joinRoom:joinRoom,
    setReady:setReady
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
    return data.user.id;
}
async function connect(userId,onConnected,onError,handleRoomMessage){
    let socket=new SockJS("http://localhost:8080/ws")
    http.stompClient=over(socket);
    const handleConnect=()=>{
        console.log("connected");
        http.stompClient.subscribe("/user/"+userId+"/room",handleRoomMessage)
        onConnected()
    }
    await http.stompClient.connect({},handleConnect,onError)
}
async function createRoom(senderId){
    http.stompClient.send("/app/createRoom",{},JSON.stringify({senderId:senderId,roomId:"",message:""}))
}

function joinRoom(senderId,roomId){
    const msg=JSON.stringify({senderId:senderId,roomId:roomId})
    console.log("joining")
    http.stompClient.send("/app/joinRoom",{},msg)
}
function setReady(senderId,roomId,value){
    const msg=JSON.stringify({senderId:senderId,message:value,roomId:roomId})
    //http.stompClient.send("/app/ready",{},msg);
    http.stompClient.send("/app/ready",{},msg);
}
export default http;