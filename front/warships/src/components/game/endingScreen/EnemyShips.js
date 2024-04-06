import FullScreenInfo from "../../utils/loading/FullScreenInfo";
import Menu from "../../utils/Menu/Menu";
import Board from "../../board/board/Board";
import fieldStyles from "../../board/field/fieldStyle.module.css";
import boardStyles from "../../board/board/boardStyle.module.css";
import MenuButton from "../../utils/menuButton/MenuButton";

function EnemyShips({ships,hideEnemyShips,nickname}){
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
            <Board additionalStyle={{marginTop:"2rem"}} generateFields={(fields)=>{
                ships.forEach(ship=>{
                    ship.fields.forEach(field=>{
                        fields[field.pos.y][field.pos.x]=ship.sunken?3:field.hit?2:1
                    })
                })
            }} isFieldDisabled={()=>true} fieldStyles={playerFieldStyle} fieldType={fieldStyles.seaField} boardStyle={boardStyles.seaBoard}></Board>
            <MenuButton containerStyle={{width:"50%",marginLeft:"auto",marginRight:"auto",marginTop:"1rem"}} message={"close"} handleClick={hideEnemyShips} ></MenuButton>
        </Menu>
    </FullScreenInfo>
}
export default EnemyShips