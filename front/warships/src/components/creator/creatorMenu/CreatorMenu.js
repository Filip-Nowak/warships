import {useContext, useEffect, useState} from "react";
import styles from "../creatorMenu.module.css";
import TopPanel from "../topPanel/TopPanel";
import BottomPanel from "../bottomPanel/BottomPanel";
import BottomPanelContext from "../../context/BottomPanelContext";
import FullScreenInfo from "../../utils/loading/FullScreenInfo";
import MenuButton from "../../utils/menuButton/MenuButton";
import MainPanel from "../mainPanel/MainPanel";
import useTimer from "../../hooks/useTimer";
import LoadingContext from "../../context/LoadingContext";
import getEmptyFields from "../../utils/getEmptyFields";
import checkField from "../../utils/checkField";

function CreatorMenu({submitShips, online, back}) {
    // const [ships, setShips] = useState([])
    const [fields, setFields] = useState(getEmptyFields())
    const [selectedShip, setSelectedShip] = useState(0)
    const [shipsLeft, setShipsLeft] = useState([1, 2, 3, 4])
    const [deployingShip, setDeployingShip] = useState([])
    const [removeMode, setRemoveMode] = useState(false)
    const [time, setTime] = useTimer(() => {
        if (time === 0) {
            handleSubmitShips();
        }
    })
    const loadingContext = useContext(LoadingContext)
    // useEffect(() => {
    //     if (deployingShip.length === selectedShip && selectedShip !== 0) {
    //         addShip()
    //         setDeployingShip([])
    //     }
    // }, [deployingShip]);
    useEffect(() => {
        if (online) {
            setTime(60)
        }
    }, []);
    const handleSubmitShips = () => {
        loadingContext.setLoading(true);
        // submitShips(ships)
    }


    const addShip = () => {
        // let fields = []
        // deployingShip.forEach(field => {
        //     fields.push({pos: {x: field.x, y: field.y}, hit: false})
        // })
        // let ship = {fields: fields, sunken: false}
        // setShips(prevState => (
        //     [...prevState, ship]
        // ))
        // setShipsLeft((prevState) => {
        //     return prevState.map((element, i) => {
        //         if (i === 4 - selectedShip) {
        //             return element - 1
        //         }
        //         return element
        //     })
        // });
        // setSelectedShip(0)
    }
    const setForbiddenFields=(x,y,fields)=>{
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                if (checkField(x + i, y + j) && fields[y + j][x + i] !== 1) {
                    fields[y+j][x+i] = 4
                }
            }
        }
    }
    const pickField = (pos) => {
        setDeployingShip(prevState => {
            prevState.push(pos)
            console.log(prevState)
            if (prevState.length === selectedShip) {
                setFields(newFields=>{
                    prevState.forEach(shipField=>{
                        newFields[shipField.y][shipField.x]=1
                        setForbiddenFields(shipField.x,shipField.y,newFields)
                    })
                    return [...newFields]
                })
                setShipsLeft(shipsLeft=>{
                    shipsLeft[4-deployingShip.length]--
                    console.log("dupa")
                    console.log(shipsLeft)
                    return[...shipsLeft]
                })
                setSelectedShip(0)
                prevState=[]
            } else {
                setFields(newFields => {
                    console.log("change")
                    if (prevState.length === 1) {
                        newFields[pos.y][pos.x] = 2
                        if (checkField(pos.x + 1, pos.y) && newFields[pos.y][pos.x + 1] === 0) {
                            newFields[pos.y][pos.x + 1] = 3
                        }
                        if (checkField(pos.x - 1, pos.y) && newFields[pos.y][pos.x - 1] === 0) {
                            newFields[pos.y][pos.x - 1] = 3
                        }
                        if (checkField(pos.x, pos.y + 1) && newFields[pos.y + 1][pos.x] === 0) {
                            newFields[pos.y + 1][pos.x] = 3
                        }
                        if (checkField(pos.x, pos.y - 1) && newFields[pos.y - 1][pos.x] === 0) {
                            newFields[pos.y - 1][pos.x] = 3
                        }
                    } else {
                        if(prevState.length===2){
                            const pos=prevState[0];
                            if (checkField(pos.x + 1, pos.y)) {
                                resetField(pos.x+1,pos.y,newFields)
                            }
                            if (checkField(pos.x - 1, pos.y)) {
                                resetField(pos.x-1,pos.y,newFields)
                            }
                            if (checkField(pos.x, pos.y + 1)) {
                                resetField(pos.x,pos.y+1,newFields)
                            }
                            if (checkField(pos.x, pos.y - 1)) {
                                resetField(pos.x,pos.y-1,newFields)
                            }
                        }
                        newFields[pos.y][pos.x] = 2
                        prevState.forEach(field => {
                            let counter = 0;
                            let pos;
                            if (checkField(field.x + 1, field.y) && newFields[field.y][field.x + 1] === 2) {
                                counter++;
                                pos = {x: field.x + 1, y: field.y}
                            }
                            if (checkField(field.x - 1, field.y) && newFields[field.y][field.x - 1] === 2) {
                                counter++;
                                pos = {x: field.x - 1, y: field.y}

                            }
                            if (checkField(field.x, field.y + 1) && newFields[field.y + 1][field.x] === 2) {
                                counter++;
                                pos = {x: field.x, y: field.y + 1}

                            }
                            if (checkField(field.x, field.y - 1) && newFields[field.y - 1][field.x] === 2) {
                                counter++;
                                pos = {x: field.x, y: field.y - 1}

                            }
                            if (counter === 1) {
                                const x = field.x + field.x - pos.x
                                const y = field.y + field.y - pos.y
                                if (checkField(x, y) && newFields[y][x] === 0)
                                    newFields[y][x] = 3
                            }
                        })
                    }
                    console.log(newFields)
                    return [...newFields]
                })
            }
            return [...prevState]
        });

    }
    const resetField = (x, y, fields) => {
        console.log("reset "+x+" "+y)
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                if (checkField(x + i, y + j) && fields[y + j][x + i] === 1) {
                    console.log("chujnia")
                    fields[y][x] = 4
                }
            }
        }
        if(fields[y][x]!==4){
            console.log("kurwa")
            fields[y][x]=0;
        }
        return fields
    }
    const changeBoardMode = (mode) => {
        setRemoveMode(!mode)
        setSelectedShip(0);
    }
    const cancelShipDeploy = () => {
        setFields(prevState=>{
            for(let i=0;i<prevState.length;i++){
                for(let j=0;j<prevState.length;j++){
                    if(prevState[i][j]===2||prevState[i][j]===3){
                        prevState[i][j]=0;
                    }
                }
            }
            return [...prevState]
        })
        setDeployingShip([]);

    }
    const removeShip = (pos) => {
        setFields(prevState=>{
            const ship=[]
            removeShipFields(pos.x,pos.y,prevState,ship)
            setShipsLeft(prevState=>{
                prevState[4-ship.length]++
                return [...prevState]
            })
            ship.forEach(field=>{
                for (let i = -1; i < 2; i++) {
                    for (let j = -1; j < 2; j++) {
                        if (checkField(field.x + i, field.y + j) && prevState[field.y + j][field.x + i] === 4) {
                            prevState[pos.y+j][pos.x+i]=0
                            for (let k = -1; k < 2; k++) {
                                for (let l = -1; l < 2; l++) {
                                    if (checkField(field.x + i+k, field.y + j+l) && prevState[field.y+l + j][field.x+k + i] === 1) {
                                        console.log("chujnia")
                                        prevState[field.y+l][field.x+k] = 4
                                    }
                                }
                            }
                        }
                    }
                }
            })
            return [...prevState]
        })
    }
    const removeShipFields=(x,y,fields,ship)=>{
        ship.push({x:x,y:y})
        fields[y][x]=0
        if(fields[y][x+1]===1){
            removeShipFields(x+1,y,fields,ship)
        }
        if(fields[y][x-1]===1){
            removeShipFields(x-1,y,fields,ship)
        }
        if(fields[y+1][x]===1){
            removeShipFields(x,y+1,fields,ship)
        }
        if(fields[y-1][x]===1){
            removeShipFields(x,y-1,fields,ship)
        }
    }

    const handleFieldClick = (pos) => {
        if (!removeMode) {
            pickField(pos)
        } else {
            removeShip(pos)
        }
    }

    let remainingShips = 0;
    shipsLeft.forEach(value => {
        remainingShips += value;
    })


    return <>
        <MenuButton message={"back"} handleClick={back}></MenuButton>
        <div className={styles.panel}>
            <TopPanel
                msg={(removeMode) ? "Pick ship to remove" : selectedShip === 0 ? "select ship to deploy" : "pick location"}
                mode={!removeMode} time={time} disabled={!online}/>
            {/*<button onClick={fill}>fill</button>*/}
            <MainPanel shipsLeft={shipsLeft} deployingShip={deployingShip} handleFieldClick={handleFieldClick}
                       ships={null} selectShip={setSelectedShip} selectedShip={selectedShip} removeMode={removeMode}
                       fields={fields}/>
            <BottomPanelContext.Provider value={{handleSubmitShips: handleSubmitShips,remainingShips: remainingShips,showCancelButton:deployingShip.length !== 0,changeMode:changeBoardMode,cancelShipDeploy:cancelShipDeploy,fields:fields}}>
                <BottomPanel ></BottomPanel>
            </BottomPanelContext.Provider>
        </div>
    </>
}

export default CreatorMenu


// const fill = () => {
//     setShips(
//         [
//             {
//                 fields: [{pos: {x: 0, y: 0}, hit: false}, {pos: {x: 1, y: 0}, hit: false}, {
//                     pos: {x: 2, y: 0},
//                     hit: false
//                 }, {pos: {x: 3, y: 0}, hit: false}],
//                 sunken: false
//             }, {
//             fields: [{pos: {x: 0, y: 2}, hit: false}, {pos: {x: 1, y: 2}, hit: false}, {
//                 pos: {x: 2, y: 2},
//                 hit: false
//             }],
//             sunken: false
//         }, {
//             fields: [{pos: {x: 0, y: 4}, hit: false}, {pos: {x: 1, y: 4}, hit: false}, {
//                 pos: {x: 2, y: 4},
//                 hit: false
//             }],
//             sunken: false
//         }, {
//             fields: [{pos: {x: 0, y: 6}, hit: false}, {pos: {x: 1, y: 6}, hit: false}],
//             sunken: false
//         }, {
//             fields: [{pos: {x: 0, y: 8}, hit: false}, {pos: {x: 1, y: 8}, hit: false}],
//             sunken: false
//         }, {
//             fields: [{pos: {x: 3, y: 8}, hit: false}, {pos: {x: 4, y: 8}, hit: false}],
//             sunken: false
//         },
//             {
//                 fields: [{pos: {x: 9, y: 0}, hit: false}],
//                 sunken: false
//             }, {
//             fields: [{pos: {x: 9, y: 2}, hit: false}],
//             sunken: false
//         }, {
//             fields: [{pos: {x: 9, y: 4}, hit: false}],
//             sunken: false
//         }, {
//             fields: [{pos: {x: 9, y: 6}, hit: false}],
//             sunken: false
//         }
//         ]
//     )
//     setShipsLeft([0,0,0,0])
// }