import Board from "../../board/board/Board";
import fieldStyles from "../../board/field/fieldStyle.module.css"
import boardStyles from "../../board/board/boardStyle.module.css"
import styles from "./gameStyle.module.css"
import ShipPanel from "../shipPanel/ShipPanel";
import {useEffect, useState} from "react";
import Bot from "../../../bot/Bot";
import shipPanel from "../shipPanel/ShipPanel";
import InfoPanel from "../infoPanel/InfoPanel";

function GameView({createdShips}) {
    // const [enemyFields, setEnemyFields] = useState(getEmptyFields())
    console.log("rendered gameview")
    const [game, setGame] = useState({})
    const [enemyShips, setEnemyShips] = useState([])
    const [misses, setMisses] = useState([])
    const [playerShips, setPlayerShips] = useState([...createdShips])
    const [enemyMisses, setEnemyMisses] = useState([])
    const [infoPanelContent, setInfoPanelContent] = useState(
        {
            shooting:false,
            pickingField:true,
            pos:{x:null,y:null},
            enemyTurn:false,
            enemyResult:false
        }
    )
    const enemyFields=getEmptyFields()
    const playerFields=getEmptyFields()
    useEffect(() => {
        console.log("bot")
        setGame(new Bot(handleEnemyHit))
    }, []);
    const [playerTurn, setPlayerTurn] = useState(true)
    let playerFieldStyle = [
        fieldStyles.seaField,
        fieldStyles.ship,
        fieldStyles.hit,
        fieldStyles.sunken,
        fieldStyles.enemyMissed
    ]
    let enemyFieldStyle = [
        fieldStyles.consoleField,
        fieldStyles.consoleHit,
        fieldStyles.consoleSunken,
        fieldStyles.consoleMissed

    ]
    const handleEnemyHit=(pos)=>{
        let index;
        let ships=[...playerShips]
        ships.forEach(ship=>{
            let sunkenShip=true
            ship.fields.forEach((field,i)=>{
                if(field.x===pos.x&&field.y===pos.y){
                    index=i
                    field.hit=true;
                }
                if(!field.hit){
                    sunkenShip=false
                }
            })
            ship.sunken=sunkenShip;
        })
        if(index===undefined){
            setEnemyMisses(prevState => ([...prevState,pos]));
            return {hit:false,sunken:false};
        }else{
            setPlayerShips(ships);
            return {hit:true,sunken:ships [index].sunken}
        }
    }

    const handleConsoleFieldClick = (x, y) => {
        if (playerTurn) {
            setInfoPanelContent(prevState => {
                let obj={...prevState};
                obj.pickingField=false
                obj.shooting=true;
                return obj
            })
            let result=game.takeShot({x:x,y:y});
            if(result.hit){
                addEnemyShip({x:x,y:y},result.sunken)
            }else{
                setMisses(prevState => (
                    [...prevState,{x:x,y:y}]
                ))
            }
        }
    }
    const addEnemyShip=(pos,sunken)=>{
            let index;
            let checked=false;
            enemyShips.forEach((ship,i)=>{
                ship.fields.forEach((field)=>{
                    if(field.x===pos.x&&field.y===pos.y){
                        checked=true
                    }else
                    if(field.x+1===pos.x&& field.y===pos.y){
                        index=i;
                    }else if(field.x-1===pos.x&& field.y===pos.y){
                        index=i;
                    }else if(field.x===pos.x&& field.y+1===pos.y){
                        index=i;
                    }else if(field.x===pos.x&& field.y-1===pos.y){
                        index=i;
                    }
                })
            })
            if(checked){

            }else
            if(index===undefined){
                setEnemyShips(prevState => (
                    [...prevState,{fields:[pos],sunken:sunken}]
                ))
            }else{
                setEnemyShips(prevState => {
                    const arr=[...prevState];
                    arr[index].fields.push(pos);
                    arr[index].sunken=sunken;
                    return arr;
                })
            }
        }


    console.log(playerShips)

    const generateEnemyFields=(fields)=>{
        enemyShips.forEach(ship=>{
            ship.fields.forEach(field=>{
                fields[field.y][field.x]=ship.sunken?2:1
            })
        })
        misses.forEach(field=>{
            fields[field.y][field.x]=3
        });
    }
    const generatePlayerFields=(fields)=>{
        playerShips.forEach(ship=>{
            console.log("Xd")
            console.log(ship)
            ship.fields.forEach(field=>{
                fields[field.pos.y][field.pos.x]=ship.sunken?3:field.hit?2:1
            })
        })
        enemyMisses.forEach(field=>{
            fields[field.y][field.x]=4
        })
    }
    return (
        <div className={styles.game}>
            <div style={{width: "50%"}}>

                <Board boardStyle={boardStyles.seaBoard} generateFields={generatePlayerFields} fieldType={fieldStyles.seaField}
                       fieldStyles={playerFieldStyle}
                       isFieldDisabled={() => true} additionalStyle={{backgroundColor:"#2777ee",border:"solid 1em #2777ee"}}/></div>
            <div style={{width: "50%"}}>
                <ShipPanel>
                    <InfoPanel info={infoPanelContent}></InfoPanel>
                    <Board generateFields={generateEnemyFields} selectedFieldStyle={fieldStyles.selectedConsoleField} boardStyle={boardStyles.enemyBoard}
                           fieldType={fieldStyles.consoleField}
                           fieldStyles={enemyFieldStyle} isFieldDisabled={() => false}
                           handleFieldClick={handleConsoleFieldClick}/>
                </ShipPanel>
            </div>
        </div>
    )
}

const getEmptyFields = () => {
    return [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
}
export default GameView