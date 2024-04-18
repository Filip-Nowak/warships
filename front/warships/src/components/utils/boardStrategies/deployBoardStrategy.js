import getEmptyFields from "../getEmptyFields";
import fieldStyles from "../../board/field/fieldStyle.module.css";

class DeployBoardStrategy {
    ships
    deployingShip
    fieldStyles=[
        fieldStyles.creatorField,
        (boardMode ? fieldStyles.creatorPicked : fieldStyles.creatorRemovable),
        fieldStyles.creatorDeploy,
        fieldStyles.creatorPossible,
        (boardMode ? fieldStyles.creatorForbidden : "")
    ]
    constructor(ships, deployingShip) {
        this.ships = ships;
        this.deployingShip = deployingShip;
    }

    generateFields = () => {
        const fields = getEmptyFields()
        this.ships.forEach(ship => {
            ship.fields.forEach(field => {
                fields[field.y][field.x]=1;
                for (let i = -1; i < 2; i++) {
                    for (let j = -1; j < 2; j++) {
                        if (checkField(field.x + i, field.y + j) && fields[field.y+j][field.x+i]!==1) {
                            fields[j+field.y][i+field.x]=2
                        }
                    }
                }
                }
            )
        })
        if(this.deployingShip.length===1){
            const x=this.deployingShip.fields[0].pos.x
            const y=this.deployingShip.fields[0].pos.y
            
            fields[y][x]=3;
            if(checkField(x+1,y)&&fields[y][x+1]===0)
                fields[y][x+1]=4
            if(checkField(x-1,y)&&fields[y][x-1]===0)
                fields[y][x-1]=4
            if(checkField(x,y+1)&&fields[y+1][x]===0)
                fields[y+1][x]=4
            if(checkField(x,y-1)&&fields[y-1][x]===0)
                fields[y-1][x]=4

        }else{
            this.deployingShip.forEach(field=>{
                fields[field.y][field.x]=3

            })
            this.deployingShip.forEach(field=>{
                let counter=0;
                let pos;
                if(checkField(field.x+1,field.y)&&fields[field.y][field.x+1]===0)
                {
                    pos=field.pos
                    counter++
                }
                if(checkField(field.x-1,field.y)&&fields[field.y][field.x-1]===0)
                {
                    pos=field.pos
                    counter++
                }
                if(checkField(field.x,field.y+1)&&fields[field.y+1][field.x]===0)
                {
                    pos=field.pos
                    counter++
                }
                if(checkField(field.x,field.y-1)&&fields[field.y-1][field.x]===3)
                {
                    pos=field.pos
                    counter++
                }
                if(counter===1){
                    const x=field.pos.x+(field.pos.x-pos.x)
                    const y=field.pos.y+(field.pos.y-pos.y)
                    field[y][x]=4
                }
            })
        }
        return fields;
    }
}

function checkField(x, y) {
    return x >= 0 && y >= 0 && x <= 9 && y <= 9;
}