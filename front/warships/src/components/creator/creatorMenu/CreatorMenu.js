import {useContext, useEffect, useRef, useState} from "react";
import GameContext from "../../context/gameContext";
import styles from "../creatorMenu.module.css";
import fieldStyles from "../../board/field/fieldStyle.module.css"
import boardStyles from "../../board/board/boardStyle.module.css"
import PanelMessage from "../panelMessage/PanelMessage";
import Board from "../../board/board/Board";
import ShipPanel from "../../game/shipPanel/ShipPanel";
import ShipSelector from "../shipSelector/ShipSelector";
import board from "../../board/board/Board";
import BottomPanel from "../bottomPanel/BottomPanel";
import CreatedShipsContext from "../../context/createdShipsContext";
import BlinkingDots from "../../utils/BlinkingDots";
function CreatorMenu({submitShips,online,fetching}){
    const [ships, setShips] = useState([])
    const [selectedShip, setSelectedShip] = useState(0)
    const [shipsLeft, setShipsLeft] = useState([1,2,3,4])
    const [deployingShip, setDeployingShip] = useState([])
    const [boardMode, setBoardMode] = useState(true)
    const [time, setTime] = useState(60)
    const interval = useRef(0);
    useEffect(() => {
        if(deployingShip.length===selectedShip&&selectedShip!==0){
            addShip()
            setDeployingShip([])
        }
    }, [deployingShip]);
    useEffect(() => {
        if(online){
            interval.current=setInterval(()=>{
                setTime(prevState => prevState-1)
            },1000)
        }
    }, []);
    useEffect(() => {
        console.log(time)
        if(time===0){
            clearInterval(interval.current)
            if(ships.length!==0){
                handleSubmitShips()
            }
        }
    }, [time]);


    const addShip=()=>{
        let fields=[]
        deployingShip.forEach(field=>{
            fields.push({pos:{x:field.x,y:field.y},hit:false})
        })
        let ship = {fields:fields,sunken:false}
        setShips(prevState => (
            [...prevState,ship]
        ))
        setShipsLeft((prevState)=>{
            return prevState.map((element,i)=>{
                if(i===4-selectedShip){
                    return element-1
                }
                return element
            })
        });
        setSelectedShip(0)
    }
    const pickField = (pos) => {
        setDeployingShip(prevState => (
            [...prevState, pos]
        ));
    }
    const changeBoardMode=(mode)=>{
        setBoardMode(mode)
        setSelectedShip(0);
    }
    const cancelShipDeploy=()=>{
        setDeployingShip([]);

    }
    const removeShip=(pos)=>{
        let shipId=-1

        ships.forEach((ship,i)=>{
            ship.fields.forEach(field=>{
                if(pos.x===field.pos.x && pos.y===field.pos.y){
                    shipId=i;
                }
            })
        })
        if(shipId===-1){
            console.log("ship doesnt exist")
            return
        }
        const size=ships[shipId].fields.length;

        setShipsLeft(prevState => {
            prevState[4 - size] += 1
            return prevState
        });
        setShips(prevState => (
            prevState.slice(0,shipId).concat(prevState.slice(shipId+1))
        ))

    }

    const generateFields=(fields)=>{
        const getField = (pos) => {
            return fields[pos.y][pos.x]
        }
        const setField = (pos, value) => {
            fields[pos.y][pos.x] = value;
        }
        const checkField = (x, y) => {
            return !(x < 0 || y < 0 || x > 9 || y > 9)
        }
        const setForbiddenFields = (x, y) => {
            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    if (checkField(x + i, y + j)) {
                        if (getField({x: x + i, y: y + j}) !== 1) {
                            setField({x: x + i, y: y + j}, 4);
                        }
                    }
                }
            }
        }
        ships.forEach(ship => {
            ship.fields.forEach(field => {
                let pos=field.pos;
                setField({x: pos.x, y: pos.y},1)
                setForbiddenFields(pos.x, pos.y);
            })
        })
        for (let i = 0; i < deployingShip.length; i++) {
            setField({x:deployingShip[i].x,y:deployingShip[i].y},2);
        }
        deployingShip.forEach(pos => {
            if (pos.x > 0) {
                if (getField({x:pos.x-1,y:pos.y}) === 0) {
                    setField({x:pos.x-1,y:pos.y},3);
                }
            }
            if (pos.y > 0) {
                if (getField({x:pos.x,y:pos.y-1}) === 0) {
                    setField({x:pos.x,y:pos.y-1},3);
                }
            }
            if (pos.x < 9) {
                if (getField({x:pos.x+1,y:pos.y}) === 0) {
                    setField({x:pos.x+1,y:pos.y},3);
                }

            }
            if (pos.y < 9) {
                if (getField({x:pos.x,y:pos.y+1}) === 0) {
                    setField({x:pos.x,y:pos.y+1},3);
                }
            }
        })

    }
    const handleFieldClick=(x,y)=>{
        const pos={x:x,y:y}
        if(boardMode){
            pickField(pos)
        }else{
            removeShip(pos)
        }
    }
    const fieldStyleList=[
        fieldStyles.creatorField,
        (boardMode?fieldStyles.creatorPicked:fieldStyles.creatorRemovable),
        fieldStyles.creatorDeploy,
        fieldStyles.creatorPossible,
        (boardMode?fieldStyles.creatorForbidden:"")
    ]
    const additionalStyle={}

    let boardDisabled=(boardMode && selectedShip===0)
    if(boardDisabled){
        additionalStyle.opacity="50%";
        additionalStyle.borderColor="#001801";
    }
    if(!boardMode){
        additionalStyle.borderColor="red"
    }
    let shipSelectorDisabled=!boardMode || (boardMode && deployingShip.length!==0)
    const isFieldDisabled=(x,y,value)=>{
        let enabled;
        if(boardDisabled)
            return true
        if(boardMode){
            if(deployingShip.length===0){
                enabled= value===0
            }else{
                enabled= value===3;
            }
        }else{
            enabled= value===1
        }
        return !enabled
    }
    let remainingShips=0;
    shipsLeft.forEach(value=>{
        remainingShips+=value;
    })
    const fill=()=>{
        // context.createdShips=[
        //     {
        //         fields:[{x:0,y:0,hit:false},{x:1,y:0,hit:false},{x:2,y:0,hit:false},{x:3,y:0,hit:false}],
        //         sunken:false
        //     }
        // ]
    }
    const handleSubmitShips=()=>{
        clearInterval(interval.current)
        submitShips(ships)
    }
    return <div>{time}<div className={styles.panel}>
        <PanelMessage msg={(!boardMode)?"Pick ship to remove":selectedShip===0?"select ship to deploy":"pick location for selected ship"} mode={boardMode}/>
        <button onClick={fill}>fill</button>
        <div style={{display:"flex",marginTop:"1rem"}}>
            <Board additionalStyle={additionalStyle} generateFields={generateFields} fieldStyles={fieldStyleList} fieldType={fieldStyles.creatorField} boardStyle={boardStyles.creatorBoard} isFieldDisabled={isFieldDisabled} handleFieldClick={handleFieldClick} selectedFieldStyle={!boardDisabled?boardMode?fieldStyles.creatorSelected:"":""}></Board>
            <ShipSelector shipsLeft={shipsLeft} selectedShip={selectedShip} disabled={shipSelectorDisabled} selectShip={setSelectedShip}></ShipSelector>
        </div>
        <CreatedShipsContext.Provider value={{ships:ships,handleSubmitShips:handleSubmitShips}}>
        <BottomPanel remainingShips={remainingShips}  showCancelButton={deployingShip.length!==0} changeMode={changeBoardMode} cancelShipDeploy={cancelShipDeploy}></BottomPanel>
        </CreatedShipsContext.Provider>
        {fetching?<div className={styles.absoluteContainer}><div className={styles.absoluteChild}> loading<BlinkingDots blinkSpeed={100}></BlinkingDots> </div></div>:""}
    </div></div>
}

export default CreatorMenu