import http from "./http";

class OnlineGame{
    #room
    #userId
    #onConnected=()=>{

    }
    #handleGameLog=(log)=>{
        console.log(log)
    }
    constructor(userId,room) {
        http.openGameWs(this.#onConnected(),()=>{console.log("error")},this.#handleGameLog)
        this.#room=room;
        this.#userId=userId
    }
    submitShips=(ships)=> {
        http.submitShips(ships.length!==0)
    }
}
export default OnlineGame