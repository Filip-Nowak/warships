export default class GameFactory{
    static #obj={
        shoot:()=>{},
        onPlayerHit:()=>{},
        onPlayerMiss:()=>{},
        onPlayerSunken:()=>{},

        onEnemyHit:()=>{},
        onEnemyMiss:()=>{},
        onEnemySunken:()=>{},

        onWin:()=>{},
        onLost:()=>{},
        onPlayerForfeit:()=>{},
        onEnemyForfeit:()=>{},
    }
    static getBotGame=()=>{
        const game={}

    }
}