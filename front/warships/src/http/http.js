const http={
    createRoom:createRoom,
    createUser:createUser,
}
async function createRoom(senderId){
    const roomMessage={senderId:senderId}
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


export default http;