import http from "./http";

class OnlineGame{
    #room
    #userId
    #launch
    #noShips
    #onConnected=()=>{

    }
    #handleGameLog=(log)=>{
        console.log(log)
    }
    constructor(userId,room) {
        http.openGameWs(this.#onConnected,()=>{console.log("error")},this.#handleGameLog)
        this.#room=room;
        this.#userId=userId
    }
    submitShips=(ships)=> {
        http.submitShips(ships.length!==0)
    }
    setLaunch=(launch)=>{
        this.#launch=launch
    }
    setNoShips=(noShips)=>{
        this.#noShips=noShips
    }

}
export default OnlineGame