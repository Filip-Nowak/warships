import SockJS from "sockjs-client";
import {over} from "stompjs";

class Online {
    #userId
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
        const obj = JSON.parse(msg.body);
        const type = obj.type;
        if (this.gameLogHandlers[type] !== undefined) {
            this.gameLogHandlers[type](obj)
        }
    }


    connect = async (username, onConnect, onError) => {
        console.log("connecting...")
        this.#username = username
        let socket = new SockJS("http://localhost:8080/ws?userid="+encodeURIComponent(this.#userId))
        this.#stompClient = over(socket);
        await this.#stompClient.connect({}, ()=>{
            this.#stompClient.subscribe("/user/" + this.#userId + "/room", this.#handleRoomMessage)
            this.#stompClient.subscribe("/user/" + this.#userId + "/game", this.#handleGameLog)
            onConnect()
        }, onError)


    }


    createUser=async (nickname)=>{
        console.log("creating user")
        this.#username=nickname
            const body = JSON.stringify({nickname: this.#username});
        const response = await fetch("http://localhost:8080/createUser", {
                    method: "POST",
                    body: body,
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
        const data=await response.json();
        this.#userId=data.userId;
    }
    // createUser = async () => {
    //     console.log("creatingUser")
    //     const body = JSON.stringify({nickname: this.#username});
    //     console.log(body)
    //     const response = await fetch("http://localhost:8080/createUser", {
    //         method: "POST",
    //         body: body,
    //         headers: {
    //             "Content-Type": "application/json"
    //         }
    //     })
    //     const data = await response.json();
    //     console.log("created user:")
    //     console.log(data)
    //     this.#userId = data.userId;
    //     this.#stompClient.subscribe("/user/" + this.#userId + "/room", this.#handleRoomMessage)
    //     this.#stompClient.subscribe("/user/" + this.#userId + "/game", this.#handleGameLog)
    // }
    createRoom = () => {
        this.#stompClient.send("/app/createRoom", {}, JSON.stringify({senderId: this.#userId}))
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
        const msg = {
            roomId: this.#roomId,
            senderId: this.#userId,
            type:"SUBMIT_SHIPS",
            ships:ships
        }
    this.#stompClient.send("/app/submitShips", {}, JSON.stringify(msg))
    }



    shoot(pos) {
        const msg={
            senderId: this.#userId,
            pos:pos,
            roomId: this.#roomId
        }
        this.#stompClient.send("/app/shoot", {}, JSON.stringify(msg))
    }

    startTurn() {
        const msg={
            senderId: this.#userId,
            roomId:this.#roomId
        }
        this.#stompClient.send("/app/startTurn",{},JSON.stringify(msg))
    }

    sendTest() {
        const msg={
            senderId: this.#userId,
            roomId:this.#roomId
        }
        this.#stompClient.send("/app/test",{},JSON.stringify(msg))
    }

    sendMove() {
        const msg={
            senderId: this.#userId,
            roomId:this.#roomId
        }
        this.#stompClient.send("/app/makeMove",{},JSON.stringify(msg))
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
}


// function setReady(value) {
//     const msg = JSON.stringify({senderId: http.userId, message: value, roomId: http.roomId})
//     //http.stompClient.send("/app/ready",{},msg);
//     http.stompClient.send("/app/ready", {}, msg);
// }
//
// function startGame() {
//     const msg = JSON.stringify({senderId: http.userId, roomId: http.roomId})
//     http.stompClient.send("/app/start", {}, msg)
// }
//
// function submitShips(shipsFilled) {
//     console.log("xd")
//     const log = {
//         pos: {x: 0, y: 0},
//         roomId: http.roomId,
//         senderId: http.userId,
//     }
//     console.log(log)
//     if (shipsFilled) {
//         log.type = "SUBMIT_SHIPS"
//     } else {
//         log.type = "NO_SHIPS"
//     }
//     http.stompClient.send("/app/submitShips", {}, JSON.stringify(log))
//
// }
const online = new Online()
export default online