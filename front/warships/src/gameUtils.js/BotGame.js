import BotEnemy from "./BotEnemy";
import {forCrossFields, getField, setField} from "../components/utils/board/boardUitils";

export default class BotGame {
    handleBotShot=(pos)=>{
        console.log("bot shoot "+pos.x+":"+pos.y)
        console.log(this.playerFields)
        const field=getField(pos.x,pos.y,this.playerFields)
        if(field===0 || field===4){
            console.log("missed")
            this.gameEvents.onEnemyMiss(pos)
        }else if(field===1){
                const copiedFields=[]
                for(let i=0;i<this.playerFields.length;i++){
                    copiedFields.push([...this.playerFields[i]])
                }
               let sunken=true;
               copiedFields[pos.y][pos.x]=5;
               const callback=(x,y,fields)=>{
                   if(getField(x,y,fields)===1){
                       sunken=false
                   }else if(getField(x,y,fields)===2){
                       fields[y][x]=5
                       forCrossFields(x,y,fields,callback)
                   }
               }
               forCrossFields(pos.x,pos.y,copiedFields,callback)
                if(sunken){
                    console.log("sunken")
                    this.gameEvents.onEnemySunken(pos)
                }else{
                    console.log("hit")
                    this.gameEvents.onEnemyHit(pos)
                }
        }else {
            this.gameEvents.onEnemyAlreadyHit(pos)
        }
        setTimeout(()=>{
            this.gameEvents.onPlayerStartedTurn()
        },2000)

    }
    bot;
    playerFields
    playerHp=10
    botHp=10
    playerIndex=0;
    enemyIndex=1
    constructor(fields) {
        this.playerFields=fields;
        this.bot=new BotEnemy(this.handleBotShot)
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
    shoot=(pos)=>{
        const {hit,sunken} =this.bot.shoot(pos)
        if(hit){
            if(sunken){
                this.gameEvents.onPlayerSunken(pos)
                this.botHp--
                if(this.botHp===0)
                    this.gameEvents.onWin()
            }else{
                this.gameEvents.onPlayerHit(pos)
            }
        }else{
            console.log("jebany nobie")
            this.gameEvents.onPlayerMiss(pos)
        }
        setTimeout(()=>{
            this.gameEvents.onEnemyStartedTurn()
            setTimeout(()=>{
                this.bot.takeShot();
            },1000)
        },1000)

    }
    forfeit=()=>{
        this.gameEvents.onPlayerForfeit()
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

}