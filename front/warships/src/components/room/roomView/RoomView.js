import Menu from "../../utils/Menu/Menu";
import CodeContainer from "./CodeContainer";
import PlayersInRoom from "./PlayersInRoom";

function RoomView({room}){
    return <Menu containerStyle={{width:"40rem",height:"40rem",marginTop:"5rem",display:"flex"}}>
        <CodeContainer code={room.id}></CodeContainer>
        <PlayersInRoom players={room.players}></PlayersInRoom>
    </Menu>
}
export default RoomView