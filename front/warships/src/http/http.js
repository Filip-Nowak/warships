import {over} from "stompjs"
import SockJS from "sockjs-client"
const http={
    createRoom:createRoom,
    createUser:createUser,
    connect:connect,
    stompClient:null
}
async function createUser(username){
    const body=JSON.stringify({username:username,id:"",roomId:""});
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
    await http.stompClient.connect({},onConnected,onError)
}
async function createRoom(senderId){
    const roomMessage={senderId:senderId}
    http.stompClient.send("/app/createRoom",{},JSON.stringify({senderId:senderId,roomId:"",message:""}))
}

export default http;