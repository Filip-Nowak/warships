import SockJS from "sockjs-client";
import {over} from "stompjs";

class Online {
    #userId=null
    #username
    #roomId
    #stompClient
    gameLogHandlers={}
    roomMessageHandlers = {}

    addRoomMessageHandler = (eventName, callback) => {
        this.roomMessageHandlers[eventName] = callback;
    }
    #handleRoomMessage = (msg) => {
        const obj = JSON.parse(msg.body);
        const type = obj.type;
        if (this.roomMessageHandlers[type] !== undefined) {
            this.roomMessageHandlers[type](obj)
        }
    }
    addGameLogHandler(eventName, callback) {
        this.gameLogHandlers[eventName] = callback;
    }
    #handleGameLog=(msg)=>{
        console.log("handling message")
        console.log(msg)
        const obj = JSON.parse(msg.body);
        const type = obj.type;
        if (this.gameLogHandlers[type] !== undefined) {
            this.gameLogHandlers[type](obj)
        }
    }

    #setError
    #onError = (e) => {
        this.deleteSession()
        this.#setError("server error occurred")
    }
    connect = async (username, onConnect, setError) => {
        this.#setError=setError
        console.log("connecting...")
        this.#username = username
        let socket = new SockJS("http://localhost:8080/ws?userid="+encodeURIComponent(this.#userId))
        this.#stompClient = over(socket);
        await this.#stompClient.connect({}, ()=>{
            this.#stompClient.subscribe("/user/" + this.#userId + "/room", this.#handleRoomMessage)
            this.#stompClient.subscribe("/user/" + this.#userId + "/game", this.#handleGameLog)
            onConnect()
        }, this.#onError)


    }


    createUser=async (nickname)=>{
        console.log("creating user")
            const body = JSON.stringify({nickname: nickname});
        const response = await fetch("http://localhost:8080/createUser", {
                    method: "POST",
                    body: body,
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
        const data=await response.json();
        this.#username=nickname
        this.#userId=data.message;
    }

    createRoom = () => {
        this.#stompClient.send("/app/createRoom", {}, JSON.stringify({senderId:this.#userId}))
    }


    joinRoom = (code) => {
        const msg = JSON.stringify({senderId: this.#userId, roomId: code})
        console.log("joining")
        this.#stompClient.send("/app/joinRoom", {}, msg)
    }
    setReady = (value) => {
        const msg = JSON.stringify({senderId: this.#userId, message: value, roomId: this.#roomId})
        console.log(this.#roomId)
        console.log(msg)
        this.#stompClient.send("/app/ready", {}, msg);
    }
    getUserId = () => {
        return this.#userId
    }
    setRoomId = (id) => {
        this.#roomId = id;
    }
    startCreator = () => {
        const msg = JSON.stringify({senderId: this.#userId, roomId: this.#roomId})
        this.#stompClient.send("/app/start", {}, msg)
    }
    submitShips = (ships) => {
        let fields;
        console.log(ships)
        let noShips=true;
        for(let i=0;i<ships.length;i++){
            for(let j=0;j<ships[i].length;j++){
                if(ships[i][j]!==0){
                    noShips=false;
                    break;
                }
            }
            if(!noShips)
                break
        }

        if(noShips){
            fields=""
        }else{
            fields=JSON.stringify(ships);
        }
        const msg = {
            roomId: this.#roomId,
            senderId: this.#userId,
            type:"SUBMIT_SHIPS",
            message:fields
        }
    this.#stompClient.send("/app/submitShips", {}, JSON.stringify(msg))
    }



    shoot(pos) {
        const message=pos===null?"":pos.x+";"+pos.y;
        const msg={
            senderId: this.#userId,
            message:message,
            roomId: this.#roomId
        }
        this.#stompClient.send("/app/shoot", {}, JSON.stringify(msg))
    }
    returnToLobby() {
        const msg={
            senderId: this.#userId,
            roomId:this.#roomId
        }
        this.#stompClient.send("/app/returnToRoom",{},JSON.stringify(msg))
    }

    getRoomId() {
        return this.#roomId
    }

    forfeit() {
        const msg={
            senderId:this.#userId,
            roomId:this.#roomId
        }
        this.#stompClient.send("/app/forfeit",{},JSON.stringify(msg))
    }

    leave() {
        const msg={
            senderId:this.#userId,
            roomId:this.#roomId
        }
        this.#stompClient.send("/app/leaveRoom",{},JSON.stringify(msg))
    }

    deleteSession() {
        this.#stompClient.disconnect(()=>{
            this.#userId=null
            this.#username=null
        });
    }

    back() {
        const msg={
            senderId:this.#userId
        }
        this.#stompClient.send("/app/back",{},JSON.stringify(msg))
    }
}


const online = new Online()
export default online