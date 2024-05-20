import online from "../online/Online";

export default class OnlineGame {
    #shootingTimer
    #resultTimer
    #pickingTimer
    playerIndex
    enemyIndex
    players = []
    setRoom
    startingPlayer

    constructor(players,setRoom,startingPlayer) {
        console.log(players+" "+startingPlayer)//
        console.log(startingPlayer)
        console.log(online.getUserId())
        if (players[0].id === online.getUserId()) {
            this.playerIndex = 0
            this.enemyIndex = 1
        } else {
            this.playerIndex = 1
            this.enemyIndex = 0
        }
        this.players = [players[0].nickname, players[1].nickname]
        if(startingPlayer===online.getUserId()){
            this.startingPlayer=this.playerIndex
        }else{
            this.startingPlayer=this.enemyIndex
        }
        this.setRoom=setRoom
        online.addGameLogHandler("HIT", this.handleHit)
        online.addGameLogHandler("SUNKEN", this.handleSunken)
        online.addGameLogHandler("ALREADY_HIT", this.handleAlreadyHit)
        online.addGameLogHandler("MISS", this.handleMiss)
        online.addGameLogHandler("STARTED_TURN", this.handleStartedTurn)
        online.addGameLogHandler("SHOOTING", this.handleShooting)
        online.addGameLogHandler("WIN", this.handleWin)
        online.addRoomMessageHandler("PLAYER_LEFT", this.handlePlayerLeft)
        online.addRoomMessageHandler("FORFEIT", this.handleForfeit)
    }

    handleHit = (msg) => {
        if (msg.senderId === online.getUserId()) {
            this.gameEvents.onPlayerHit(msg.pos)
        } else {
            this.gameEvents.onEnemyHit(msg.pos)
        }
    }
    handleSunken = (msg) => {
        if (msg.senderId === online.getUserId()) {
            this.gameEvents.onPlayerSunken(msg.pos)
        } else {
            this.gameEvents.onEnemySunken(msg.pos)
        }
    }
    handleAlreadyHit = (msg) => {
        if (msg.senderId === online.getUserId()) {
            this.gameEvents.onPlayerAlreadyHit(msg.pos)
        } else {
            this.gameEvents.onEnemyAlreadyHit(msg.pos)
        }
    }
    handleMiss = (msg) => {
        if (msg.senderId === online.getUserId()) {
            this.gameEvents.onPlayerMiss(msg.pos)
        } else {
            this.gameEvents.onEnemyMiss(msg.pos)
        }
    }
    handleStartedTurn = (msg) => {
        if (msg.senderId === online.getUserId()) {
            this.gameEvents.onPlayerStartedTurn(10)
        } else {
            this.gameEvents.onEnemyStartedTurn(10)
        }
    }
    handleShooting = (msg) => {
        if (msg.senderId === online.getUserId()) {
            this.gameEvents.onPlayerShooting()
        } else {
            this.gameEvents.onEnemyShooting();
        }
    }
    handleWin = (msg) => {
        online.addGameLogHandler("HIT", ()=>{})
        online.addGameLogHandler("SUNKEN", ()=>{})
        online.addGameLogHandler("ALREADY_HIT", ()=>{})
        online.addGameLogHandler("MISS", ()=>{})
        online.addGameLogHandler("STARTED_TURN", ()=>{})
        online.addGameLogHandler("SHOOTING", ()=>{})
        online.addGameLogHandler("WIN", ()=>{})
        const data= JSON.parse(msg.message)
        if (data.id === online.getUserId()) {
            this.gameEvents.onWin(data.fields)
        } else {
            this.gameEvents.onLost(data.fields);
        }
    }
    handlePlayerLeft = (msg) => {
        online.addGameLogHandler("HIT", ()=>{})
        online.addGameLogHandler("SUNKEN", ()=>{})
        online.addGameLogHandler("ALREADY_HIT", ()=>{})
        online.addGameLogHandler("MISS", ()=>{})
        online.addGameLogHandler("STARTED_TURN", ()=>{})
        online.addGameLogHandler("SHOOTING", ()=>{})
        online.addGameLogHandler("WIN", ()=>{})
        const data=JSON.parse(msg.message);
        this.setRoom(prevState=>{
            prevState.users = prevState.users.filter(player=>player.id!==data.id && player.id!==msg.message)
            prevState.ownerId=online.getUserId()
            return {...prevState}
        })
        this.gameEvents.onPlayerLeft(data.fields);
    }
    handleForfeit = (msg) => {
        console.log("ff")
        online.addGameLogHandler("HIT", ()=>{})
        online.addGameLogHandler("SUNKEN", ()=>{})
        online.addGameLogHandler("ALREADY_HIT", ()=>{})
        online.addGameLogHandler("MISS", ()=>{})
        online.addGameLogHandler("STARTED_TURN", ()=>{})
        online.addGameLogHandler("SHOOTING", ()=>{})
        online.addGameLogHandler("WIN", ()=>{})
        const data=JSON.parse(msg.message)
        if (data.id === online.getUserId()) {
            this.gameEvents.onPlayerForfeit(data.fields)
        } else {
            this.gameEvents.onEnemyForfeit(data.fields)
        }
    }
    shoot = (pos) => {
        online.shoot(pos)
    }
    gameEvents = {
        onStart: () => {
        },
        onPlayerHit: () => {
        },
        onPlayerMiss: () => {
        },
        onPlayerSunken: () => {
        },

        onEnemyHit: () => {
        },
        onEnemyMiss: () => {
        },
        onEnemySunken: () => {
        },

        onPlayerShooting: () => {
        },
        onEnemyShooting: () => {
        },
        onWin: () => {
        },
        onLost: () => {
        },
        onPlayerForfeit: () => {
        },
        onEnemyForfeit: () => {
        },
        onEnemyAlreadyHit: (pos) => {
        }
        , onPlayerAlreadyHit: (pos) => {
        },
        onPlayerStartedTurn: () => {
        },
        onEnemyStartedTurn: () => {
        },
        onPlayerLeft:()=>{}
    }
    forfeit=()=>{
        online.forfeit()
    }
    endGame=()=>{

    }
}