import {useState} from "react";

function CreatorBoard({fields}){
    const [selectedField, setSelectedField] = useState([0,0])
    const pickField=(x,y)=>{
        fields[x][y]=1
    }

    const handleCancelShip=(x,y)=>{

    }

    const selectField=(x,y)=>{
        console.log("selected["+x+"]["+y+"]")
        setSelectedField([x,y])
    }
    return <div style={styles.board}>
        {fields.map((row,y)=>{
            return row.map((field,x)=>{
                 return <Field x={x} y={y} selected={selectedField[0]===x&&selectedField[1]===y} picked={fields[x][y]===1}select={selectField} pickField={pickField}></Field>
            })
        })}
    </div>
}
function Field({x,y,selected,select,picked,pickField}){
    console.log(selected)
    const [light, setLight] = useState(true)
    let style;
    let timeout;

    const handleClick=()=>{
        if(selected){
            pickField(x,y)

        }
    }
    const handleMouseOver=()=>{
        if(!selected && !picked)
            select(x,y)
    }
    const handleMouseLeave=()=>{
        if(!selected)
            clearTimeout(timeout);
    }

    if(picked){
        style={backgroundColor:  "#1BC000",...styles.field}
    }else
    if(selected){
        if(light)
            style={backgroundColor: "#1BC000",...styles.field}
        else{
            style=styles.field;
        }
        timeout = setTimeout(()=>{
            setLight(newLight=>{
                return!newLight
            })
        },500)
    }else{
        style=styles.field;

    }
    return <div onMouseLeave={handleMouseLeave} onMouseOver={handleMouseOver} onClick={handleClick} style={style}>
    </div>
}
const styles={
    board:{
        border:"0.5em #1BC000 solid",
        width:"30em",
        display:"flex",
        flexWrap:"wrap",
        height:"30em",
        padding:"0.5em"
    },
    field:{
        width:"2em",
        height: "2em",
        border:"0.5em solid #001801",
    }
}
export default CreatorBoard