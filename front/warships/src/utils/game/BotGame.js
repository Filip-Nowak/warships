import {forCrossFields, getField} from "../board/boardUitils";
import SmartBot from "./SmartBot";

export default class BotGame {
    handleBotShot=(pos)=> {
        const field = getField(pos.x, pos.y, this.playerFields)
        if (field === 0 || field === 4) {
            this.gameEvents.onEnemyMiss(pos)
        } else if (field === 1) {
            const copiedFields = []
            for (let i = 0; i < this.playerFields.length; i++) {
                copiedFields.push([...this.playerFields[i]])
            }
            let sunken = true;
            copiedFields[pos.y][pos.x] = 5;
            const callback = (x, y, fields) => {
                if (getField(x, y, fields) === 1) {
                    sunken = false
                } else if (getField(x, y, fields) === 2) {
                    fields[y][x] = 5
                    forCrossFields(x, y, fields, callback)
                }
            }
            forCrossFields(pos.x, pos.y, copiedFields, callback)
            if (sunken) {
                this.gameEvents.onEnemySunken(pos)
                this.bot.shotResult(2,pos);
                this.playerHp--;
                if(this.playerHp===0){
                    this.gameEvents.onLost(this.bot.fields);
                }
            } else {
                this.gameEvents.onEnemyHit(pos)
                this.bot.shotResult(1,pos);
            }
        } else {
            this.gameEvents.onEnemyAlreadyHit(pos)
        }
        if(field!==1){
            this.bot.shotResult(0,pos);
        }
        setTimeout(() => {
            this.gameEvents.onPlayerStartedTurn()
        }, 2000)

    }
    #shootingTimer
    #resultTimer
    #pickingTimer
    bot;
    playerFields
    playerHp=10
    botHp=10
    playerIndex=0;
    enemyIndex=1
    constructor(fields) {
        this.playerFields=fields;
        this.bot=new SmartBot(this.handleBotShot)
    }
    startTimer=()=>{
        setTimeout(()=>{
            this.gameEvents.onStart()
            this.gameEvents.onPlayerStartedTurn()
        },0)
    }
    setPlayerFields=(fields)=>{
        this.playerFields=fields;
    }
    shoot= (pos)=>{
        this.gameEvents.onPlayerShooting()
        this.#shootingTimer=setTimeout(()=> {
            const {hit, sunken} = this.bot.shoot(pos)
            if (hit) {
                if (sunken) {
                    this.gameEvents.onPlayerSunken(pos)
                    this.botHp--
                    if (this.botHp === 0)
                        this.gameEvents.onWin(this.bot.fields)
                } else {
                    this.gameEvents.onPlayerHit(pos)
                }
            } else {
                this.gameEvents.onPlayerMiss(pos)
            }
            this.#resultTimer=setTimeout(() => {
                this.gameEvents.onEnemyStartedTurn()
                this.#pickingTimer=setTimeout(() => {
                    this.bot.takeShot();
                }, 1000)
            }, 2000)
        },1500)

    }
    forfeit=()=>{
        this.gameEvents.onPlayerForfeit(this.bot.fields)
    }



    players=["you","bot"]
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
    endGame=()=>{
        clearTimeout(this.#shootingTimer)
        clearTimeout(this.#resultTimer)
        clearTimeout(this.#pickingTimer)
    }
}