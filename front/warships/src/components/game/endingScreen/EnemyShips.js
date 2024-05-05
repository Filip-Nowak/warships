import FullScreenInfo from "../../utils/loading/FullScreenInfo";
import Menu from "../../utils/menu/Menu";
import Board from "../../board/board/Board";
import fieldStyles from "../../board/field/fieldStyle.module.css";
import boardStyles from "../../board/board/boardStyle.module.css";
import MenuButton from "../../utils/menuButton/MenuButton";
import BoardInfoFactory from "../../../utils/board/BoardInfoFactory";

function EnemyShips({fields,hideEnemyShips,nickname}){
    return <FullScreenInfo>
        <Menu containerStyle={{width:"40rem",height:"40rem",backgroundColor:"#1E6DE2", marginTop:"3rem",paddingTop:"3rem"}}>
            <div style={{textAlign:"center"}}>{nickname+"'s ships"}</div>
            <Board boardInfo={BoardInfoFactory.getSeaBoard()} fields={fields}/>
            <MenuButton containerStyle={{width:"50%",marginLeft:"auto",marginRight:"auto",marginTop:"1rem"}} message={"close"} handleClick={hideEnemyShips} ></MenuButton>
        </Menu>
    </FullScreenInfo>
}
export default EnemyShips