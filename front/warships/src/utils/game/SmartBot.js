import getEmptyFields from "../board/getEmptyFields";
import {cloneFields, getRandomNumber, printFields, setAroundFields} from "../board/boardUitils";

class SmartBot{
    fields = getEmptyFields()
    handleEnemyHit
    constructor(handleEnemyHit) {
        this.handleEnemyHit = handleEnemyHit
        this.generateRandomFields()
    }
    generateRandomFields(){
        console.log("adding ship")
        this.addShip(4);
        this.addShip(3);
    }
    addShip(size){
        const fields=cloneFields(this.fields);
        const possible={x:[0,1,2,3,4,5,6,7,8,9],y:[0,1,2,3,4,5,6,7,8,9]};
        let x,y;
        console.log("getting random cords")
        while(true){
            const axis=possible.x.length===0?false:possible.y.length===0?true:getRandomNumber(2)===1;
            const index=axis?possible.x[getRandomNumber(possible.x.length)]:possible.y[getRandomNumber(possible.y.length)]
            const added=this.deployShip(index,axis,size);
            if(added){
                break;
            }else{
                if(axis){
                    possible.x.slice(possible.x.indexOf(index))
                }else{
                    possible.y.slice(possible.y.indexOf(index))
                }
            }
        }

    }
    deployShip(index,axis,size){
        const fields=cloneFields(this.fields)
        let line=axis?fields[index]:fields.map(row=>row[index]);
        console.log("line: "+line)
        const possibleSpaces=[];
        let space={start:0,length:0};
        let start=true;
        for(let i=0;i<line.length;i++){
            if(line[i]===0){
                if(start){
                    space={start:i,length: 1};
                    start=false;
                    continue;
                }
                space.length++;
            }else{
                start=true;
                if(space.length>=size){
                    possibleSpaces.push({...space});
                }
                space={start:0,length:0};
            }
            console.log("current space: "+JSON.stringify(space))
        }
        if(possibleSpaces.length!==0&&!start){
            console.log("many spaces")
            space=possibleSpaces[getRandomNumber(possibleSpaces.length)];
        }
        console.log(space)
        if(line[space.start]!==0)
            return false
        const startIndex=space.start+getRandomNumber(space.length-size);
        if(axis){
            for(let i=0;i<size;i++){
                fields[index][startIndex+i]=1
                setAroundFields(startIndex+i,index,fields,2,v=>{return v===0});
            }
        }else{
            for(let i=0;i<size;i++){
                fields[startIndex+i][index]=1
                setAroundFields(index,startIndex+i,fields,2,v=>{return v===0});
            }
        }
        printFields(fields)
        this.fields=fields
        return true
    }

 }
 export default SmartBot