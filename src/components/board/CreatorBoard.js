import {useState} from "react";

function CreatorBoard({ships, disabled,deployingShip,pickField,mode,removeShip}) {
    const [selectedField, setSelectedField] = useState([0, 0])
    const fields = getEmptyFields();
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
    let style;


    ships.forEach(ship => {
        ship.forEach(pos => {
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


    const selectField = (x, y) => {
        setSelectedField([x, y])
    }



    style = styles.board;
    if (disabled) {
        style = {...style, opacity: "50%",border:"0.5em #001801 solid"}
    }
    const handleClick=(pos)=>{
        if(mode){
            pickField(pos);
        }else{
            removeShip(pos)
        }
    }
    return <div style={style}>
        {fields.map((row, y) => {
            return row.map((field, x) => {
                return (
                    <Field
                        disabled={disabled || !(field===0?(deployingShip.length===0):field===3 || !mode)}
                        x={x} y={y}
                        selected={selectedField[0] === x && selectedField[1] === y}
                        picked={getField({x:x,y:y}) === 1}
                        select={selectField}
                        value={field}
                        handleFieldClick={handleClick}
                        mode={mode}
                    >
                        {x + "," + y + ": " + field}
                    </Field>
                )
            })
        })}
    </div>
}


function Field({x, y, selected, select, picked, handleFieldClick, disabled, children, value,mode}) {
    const [light, setLight] = useState(true)
    let style = styles.field;
    let timeout;

    const handleClick = () => {
        if (!disabled )
        {
            handleFieldClick({x: x, y: y})
        }
    }
    const handleMouseOver = () => {
        select(x, y)
    }
    const handleMouseLeave = () => {
    }
    if(mode)
    {
        if (value === 1) {
            style = {...style, backgroundColor: "#1BC000", border: "0.5em solid #1BC000"}
        } else if (value === 2) {
            style = {...style, backgroundColor: "yellow"}

        } else if (value === 3) {
            style = {...style, backgroundColor: "blue"}

        } else if (value === 4) {
            style = {...style, backgroundColor: "#330000", border: "0.5em solid #330000"}
        }
    }else{
        if(value===1){
            style = {...style, backgroundColor: "red", border: "0.5em solid red"}
        }
    }
    if (selected) {
        style = {...style, border: "solid 0.5em #1BC000"}
    }

    return <div onMouseLeave={handleMouseLeave} onMouseOver={handleMouseOver} onClick={handleClick} style={style}>

    </div>
}

const styles = {
    board: {
        border: "0.5em #1BC000 solid",
        width: "30em",
        display: "flex",
        flexWrap: "wrap",
        height: "30em",
        padding: "0.5em"
    },

    field: {
        width: "2em",
        height: "2em",
        border: "0.5em solid #001801",
    }
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
export default CreatorBoard