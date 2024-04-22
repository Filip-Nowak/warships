import FullScreenInfo from "../../utils/loading/FullScreenInfo";
import Menu from "../../utils/Menu/Menu";
import Board from "../../board/board/Board";
import fieldStyles from "../../board/field/fieldStyle.module.css";
import boardStyles from "../../board/board/boardStyle.module.css";
import MenuButton from "../../utils/menuButton/MenuButton";
import BoardFactory from "../../utils/board/boardFactory";

function EnemyShips({fields,hideEnemyShips,nickname}){
    let playerFieldStyle = [
        fieldStyles.seaField,
        fieldStyles.ship,
        fieldStyles.hit,
        fieldStyles.sunken,
        fieldStyles.enemyMissed
    ]
    return <FullScreenInfo>
        <Menu containerStyle={{width:"40rem",height:"40rem",backgroundColor:"#1E6DE2", marginTop:"3rem",paddingTop:"3rem"}}>
            <div style={{textAlign:"center"}}>{nickname+"'s ships"}</div>
            <Board boardInfo={BoardFactory.getSeaBoard()} fields={fields}/>
            <MenuButton containerStyle={{width:"50%",marginLeft:"auto",marginRight:"auto",marginTop:"1rem"}} message={"close"} handleClick={hideEnemyShips} ></MenuButton>
        </Menu>
    </FullScreenInfo>
}
export default EnemyShips