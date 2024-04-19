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
import {
    forAroundFields, forCrossFields,
    getField,
    printFields,
    setAroundFields,
    setCrossFields,
    setField
} from "../../utils/board/boardUitils";

function CreatorMenu({submitShips, online, back}) {
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
    useEffect(() => {
        if (online) {
            setTime(60)
        }
    }, []);
    const handleSubmitShips = () => {
        loadingContext.setLoading(true);
        submitShips(fields)
    }


    const setForbiddenFields = (x, y, fields) => {
        const condition = (v) => {
            return v !== 1
        }
        setAroundFields(x, y, fields, 4, condition)
    }
    const pickField = (pos) => {
        setDeployingShip(prevState => {
            prevState.push(pos)
            if (prevState.length === selectedShip) {
                setFields(newFields => {
                    prevState.forEach(shipField => {
                        newFields[shipField.y][shipField.x] = 1
                        setForbiddenFields(shipField.x, shipField.y, newFields)
                    })
                    return [...newFields]
                })
                setShipsLeft(shipsLeft => {
                    shipsLeft[4 - deployingShip.length]--
                    return [...shipsLeft]
                })
                setSelectedShip(0)
                prevState = []
            } else {
                setFields(newFields => {
                    if (prevState.length === 1) {
                        newFields[pos.y][pos.x] = 2
                        const condition = (v) => {
                            return v === 0
                        }
                        setCrossFields(pos.x, pos.y, newFields, 3, condition)
                    } else {
                        if (prevState.length === 2) {
                            const pos = prevState[0];
                            forCrossFields(pos.x, pos.y, newFields, (x, y, fields) => {
                                resetField(x, y, fields)
                            })
                        }
                        newFields[pos.y][pos.x] = 2
                        prevState.forEach(field => {
                            let counter = 0;
                            let pos;
                            const callback = (x, y, fields) => {
                                if (getField(x, y, fields) === 2) {
                                    counter++
                                    pos = {x: x, y: y}
                                }

                            }
                            forCrossFields(field.x, field.y, newFields, callback)
                            if (counter === 1) {
                                const x = field.x + field.x - pos.x
                                const y = field.y + field.y - pos.y
                                if (checkField(x, y) && newFields[y][x] === 0)
                                    newFields[y][x] = 3
                            }
                        })
                    }
                    return [...newFields]
                })
            }
            return [...prevState]
        });

    }
    const resetField = (x, y, fields) => {
        const callback = (x1, y1, fields) => {
            if (getField(x1, y1, fields) === 1) {
                setField(x, y, fields, 4)
            }
        }
        forAroundFields(x, y, fields, callback)
        const field = getField(x, y, fields)
        if (field !== undefined && field !== 4) {
            fields[y][x] = 0;
        }
        return fields
    }
    const changeBoardMode = (mode) => {
        setRemoveMode(!mode)
        setSelectedShip(0);
    }
    const cancelShipDeploy = () => {
        setFields(prevState => {
            for (let i = 0; i < prevState.length; i++) {
                for (let j = 0; j < prevState.length; j++) {
                    if (prevState[i][j] === 2 || prevState[i][j] === 3) {
                        prevState[i][j] = 0;
                    }
                }
            }
            return [...prevState]
        })
        setDeployingShip([]);

    }
    const clearFields = (x, y, fields,ship) => {
        setField(x,y,fields,0)
        ship.push({x:x,y:y})
        const check=(x,y,fields)=>{
            const field=getField(x,y,fields)
            if(field!==undefined && field===1){
                clearFields(x,y,fields,ship)
            }
        }
        forCrossFields(x,y,fields,check)
    }
    const deleteForbiddenFields=(x,y,fields)=>{
        const callback=(x,y,fields)=>{
            if(getField(x,y,fields)===4){
                setField(x,y,fields,0)
                forAroundFields(x,y,fields,(x1,y1,fields)=>{
                    if(getField(x1,y1,fields)===1){
                        setField(x,y,fields,4)
                    }
                })
            }
        }
        forAroundFields(x,y,fields,callback)
    }
    const removeShip = ({x, y}) => {
        setFields(prevState => {
            const ship=[]
          clearFields(x,y,prevState,ship)
            ship.forEach(({x,y})=>{
                deleteForbiddenFields(x,y,prevState)
            })
            setShipsLeft(prevShipsLeft=>{
                prevShipsLeft[4-ship.length]++
                return [...prevShipsLeft]
            })
          return [...prevState]
        })
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
            <BottomPanelContext.Provider value={{
                handleSubmitShips: handleSubmitShips,
                remainingShips: remainingShips,
                showCancelButton: deployingShip.length !== 0,
                changeMode: changeBoardMode,
                cancelShipDeploy: cancelShipDeploy,
                fields: fields
            }}>
                <BottomPanel></BottomPanel>
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