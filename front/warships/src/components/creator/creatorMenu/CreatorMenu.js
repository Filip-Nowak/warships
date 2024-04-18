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

function CreatorMenu({submitShips, online,back}) {
    const [ships, setShips] = useState([])
    const [selectedShip, setSelectedShip] = useState(0)
    const [shipsLeft, setShipsLeft] = useState([1, 2, 3, 4])
    const [deployingShip, setDeployingShip] = useState([])
    const [removeMode, setRemoveMode] = useState(false)
    const [time, setTime] = useTimer(()=>{if (time === 0) {handleSubmitShips();}})
    const loadingContext=useContext(LoadingContext)
    useEffect(() => {
        if (deployingShip.length === selectedShip && selectedShip !== 0) {
            addShip()
            setDeployingShip([])
        }
    }, [deployingShip]);
    useEffect(() => {
        if (online) {
            setTime(60)
        }
    }, []);
    const handleSubmitShips = () => {
        loadingContext.setLoading(true);
        submitShips(ships)
    }


    const addShip = () => {
        let fields = []
        deployingShip.forEach(field => {
            fields.push({pos: {x: field.x, y: field.y}, hit: false})
        })
        let ship = {fields: fields, sunken: false}
        setShips(prevState => (
            [...prevState, ship]
        ))
        setShipsLeft((prevState) => {
            return prevState.map((element, i) => {
                if (i === 4 - selectedShip) {
                    return element - 1
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
    const changeBoardMode = (mode) => {
        setRemoveMode(!mode)
        setSelectedShip(0);
    }
    const cancelShipDeploy = () => {
        setDeployingShip([]);

    }
    const removeShip = (pos) => {
        let shipId = -1

        ships.forEach((ship, i) => {
            ship.fields.forEach(field => {
                if (pos.x === field.pos.x && pos.y === field.pos.y) {
                    shipId = i;
                }
            })
        })
        if (shipId === -1) {
            return
        }
        const size = ships[shipId].fields.length;

        setShipsLeft(prevState => {
            prevState[4 - size] += 1
            return prevState
        });
        setShips(prevState => (
            prevState.slice(0, shipId).concat(prevState.slice(shipId + 1))
        ))

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
    const fill = () => {
        setShips(
            [
                {
                    fields: [{pos: {x: 0, y: 0}, hit: false}, {pos: {x: 1, y: 0}, hit: false}, {
                        pos: {x: 2, y: 0},
                        hit: false
                    }, {pos: {x: 3, y: 0}, hit: false}],
                    sunken: false
                }, {
                fields: [{pos: {x: 0, y: 2}, hit: false}, {pos: {x: 1, y: 2}, hit: false}, {
                    pos: {x: 2, y: 2},
                    hit: false
                }],
                sunken: false
            }, {
                fields: [{pos: {x: 0, y: 4}, hit: false}, {pos: {x: 1, y: 4}, hit: false}, {
                    pos: {x: 2, y: 4},
                    hit: false
                }],
                sunken: false
            }, {
                fields: [{pos: {x: 0, y: 6}, hit: false}, {pos: {x: 1, y: 6}, hit: false}],
                sunken: false
            }, {
                fields: [{pos: {x: 0, y: 8}, hit: false}, {pos: {x: 1, y: 8}, hit: false}],
                sunken: false
            }, {
                fields: [{pos: {x: 3, y: 8}, hit: false}, {pos: {x: 4, y: 8}, hit: false}],
                sunken: false
            },
                {
                    fields: [{pos: {x: 9, y: 0}, hit: false}],
                    sunken: false
                }, {
                fields: [{pos: {x: 9, y: 2}, hit: false}],
                sunken: false
            }, {
                fields: [{pos: {x: 9, y: 4}, hit: false}],
                sunken: false
            }, {
                fields: [{pos: {x: 9, y: 6}, hit: false}],
                sunken: false
            }
            ]
        )
        setShipsLeft([0,0,0,0])
    }

    return <>
        <MenuButton message={"back"} handleClick={back}></MenuButton>
        <div className={styles.panel}>
            <TopPanel
                msg={(removeMode) ? "Pick ship to remove" : selectedShip === 0 ? "select ship to deploy" : "pick location"}
                mode={!removeMode} time={time} disabled={!online}/>
            <button onClick={fill}>fill</button>
            <MainPanel shipsLeft={shipsLeft} deployingShip={deployingShip} handleFieldClick={handleFieldClick} ships={ships} selectShip={setSelectedShip} selectedShip={selectedShip} removeMode={removeMode}/>
            <BottomPanelContext.Provider value={{ships: ships, handleSubmitShips: handleSubmitShips,remainingShips: remainingShips,showCancelButton:deployingShip.length !== 0,changeMode:changeBoardMode,cancelShipDeploy:cancelShipDeploy}}>
                <BottomPanel ></BottomPanel>
            </BottomPanelContext.Provider>
        </div>
    </>
}

export default CreatorMenu