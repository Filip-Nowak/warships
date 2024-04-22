import online from "./Online";

export default class OnlineGame{
    #shootingTimer
    #resultTimer
    #pickingTimer
    playerIndex
    enemyIndex
    players=[]
    constructor(players) {
        if(players[0].id===online.getUserId()){
            this.playerIndex=0
            this.enemyIndex=1
        }else{
            this.playerIndex=1
            this.enemyIndex=0
        }
        this.players=[players[0].nickname,players[1].nickname]
        online.addGameLogHandler("HIT",this.handleHit)
        online.addGameLogHandler("SUNKEN",this.handleSunken)
        online.addGameLogHandler("ALREADY_HIT",this.handleAlreadyHit)
        online.addGameLogHandler("MISS",this.handleMiss)
        online.addGameLogHandler("STARTED_TURN",this.handleStartedTurn)
        online.addGameLogHandler("SHOOTING",this.handleShooting)
        online.addGameLogHandler("WIN",this.handleWin)
        online.addGameLogHandler("PLAYER_LEFT",this.handlePlayerLeft )
        online.addGameLogHandler("FORFEIT",this.handleForfeit)
    }
    handleHit=(msg)=>{
        if(msg.senderId===online.getUserId()){
            this.gameEvents.onPlayerHit(msg.pos)
        }else{
            this.gameEvents.onEnemyHit(msg.pos)
        }
    }
    handleSunken=(msg)=>{
        if(msg.senderId===online.getUserId()){
            this.gameEvents.onPlayerHit(msg.pos)
        }else{
            this.gameEvents.onEnemyHit(msg.pos)
        }
    }
    handleAlreadyHit=(msg)=>{
        if(msg.senderId===online.getUserId()){
            this.gameEvents.onPlayerHit(msg.pos)
        }else{
            this.gameEvents.onEnemyHit(msg.pos)
        }
    }
    handleMiss=(msg)=>{
        if(msg.senderId===online.getUserId()){
            this.gameEvents.onPlayerHit(msg.pos)
        }else{
            this.gameEvents.onEnemyHit(msg.pos)
        }
    }
    handleStartedTurn=(msg)=>{
        if(msg.senderId===online.getUserId()){
            this.gameEvents.onPlayerHit(msg.pos)
        }else{
            this.gameEvents.onEnemyHit(msg.pos)
        }
    }
    handleShooting=(msg)=>{

    }
    handleWin=(msg)=>{

    }
    handlePlayerLeft=(msg)=>{

    }
    handleForfeit=(msg)=>{

    }
    gameEvents={
        onStart:()=>{},
        onPlayerHit:()=>{},
        onPlayerMiss:()=>{},
        onPlayerSunken:()=>{},

        onEnemyHit:()=>{},
        onEnemyMiss:()=>{},
        onEnemySunken:()=>{},

        onPlayerShooting:()=>{},
        onEnemyShooting:()=>{},
        onWin:()=>{},
        onLost:()=>{},
        onPlayerForfeit:()=>{},
        onEnemyForfeit:()=>{},
        onEnemyAlreadyHit:(pos)=> {}
        ,onPlayerAlreadyHit:(pos)=>{},
        onPlayerStartedTurn:()=>{},
        onEnemyStartedTurn:()=>{}
    }
}