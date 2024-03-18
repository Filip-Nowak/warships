import BlinkingDots from "../../utils/BlinkingDots";

function PlayersInRoom({players}){
    return <div>
        <div>players in room</div>
        <div>
            <div>{players[0]}</div>
            <div>{players.length===2?players[1]:"waiting"+<BlinkingDots></BlinkingDots>}</div>
        </div>
    </div>
}
export default PlayersInRoom