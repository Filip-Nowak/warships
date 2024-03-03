import {useState} from "react";

function CreatorBoard({ships,addShip,disabled,deployingShipNumber}){
    const [selectedField, setSelectedField] = useState([0,0])
    const [deployingShip, setDeployingShip] = useState({fields:[],size:0})
    const fields=getEmptyFields();
    let style;
    ships.forEach(ship=>{
        fields[ship.x][ship.y]=1;
    })
    console.log("xd"+deployingShip.toString())
    for(let i=0;i<deployingShip.fields.length;i++){
        fields[deployingShip.fields[i].x][deployingShip.fields[i].y]=2;
    }
    deployingShip.fields.forEach(pos=>{
        if(pos.x>0){
            if(fields[pos.x-1][pos.y]===0){
                fields[pos.x-1][pos.y]=3;
            }
        }
        if(pos.y>0){
            if(fields[pos.x][pos.y-1]===0){
                fields[pos.x][pos.y-1]=3;
            }
        }
        if(pos.x<9){
            if(fields[pos.x+1][pos.y]===0){
                fields[pos.x+1][pos.y]=3;
            }
        }
        if(pos.y<9){
            if(fields[pos.x][pos.y+1]===0){
                fields[pos.x][pos.y+1]=3;
            }
        }
    })



    const selectField=(x,y)=>{
        setSelectedField([x,y])
    }
    const pickField=(pos)=>{
        setDeployingShip(prevState=>({
            ...prevState,
            fields:[...prevState.fields,pos]
        }));
    }


    style=styles.board;
    if(disabled)
        style={...style,opacity:"50%"}
    return <div style={style}>
        {fields.map((row,x)=>{
            return row.map((field,y)=>{
                 return(
                     <Field
                            disabled={disabled}
                            x={x} y={y}
                            selected={selectedField[0]===x&&selectedField[1]===y}
                            picked={fields[x][y]===1}
                            select={selectField}
                            pickField={pickField}
                            value={field}
                     >
                         {field}
                    </Field>
                 )
            })
        })}
    </div>
}



function Field({x,y,selected,select,picked,pickField,disabled,children,value}){
    const [light, setLight] = useState(true)
    let style=styles.field;
    let timeout;

    const handleClick=()=>{
        console.log("clicked")
        pickField({x:x,y:y})
    }
    const handleMouseOver=()=>{
        if(!selected && !picked)
            select(x,y)
    }
    const handleMouseLeave=()=>{

    }
    if(value===1){
        style={...style,backgroundColor:"#1BC000"}
    }else if(value===2){
        style={...style,backgroundColor:"yellow"}

    }else if(value===3){
        style={...style,backgroundColor:"blue"}

    }else if(value===4){
        style={...style,backgroundColor:"red"}

    }

    return <div onMouseLeave={handleMouseLeave} onMouseOver={handleMouseOver} onClick={handleClick} style={style}>
        {children}
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
const getEmptyFields=()=>{
    return [
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0]
    ]
}
export default CreatorBoard