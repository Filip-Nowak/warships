import {forAroundFields, getEmptyFields,
    getField,
    getRandomNumber,setField} from "../board/boardUitils";

class SmartBot {
    fields = getEmptyFields()
    handleEnemyHit

    constructor(handleShot) {
        this.handleShot = handleShot
        this.generateRandomFields()
    }

    generateRandomFields() {
        this.addShip(4);
        this.addShip(3);
        this.addShip(3);
        this.addShip(2);
        this.addShip(2);
        this.addShip(2);
        this.addShip(1);
        this.addShip(1);
        this.addShip(1);
        this.addShip(1);
    }

    addShip(size, index2, axis2) {
        const possible = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        let line = [];
        let index;
        let axis;
        while (true) {
            const [checkingIndex, lines] = this.getLine(possible);
            if(this.isLinePossible(lines[0],size)){
                index=checkingIndex;
                line=lines[0];
                axis=line===this.fields[index];
                break
            }
            if(this.isLinePossible(lines[1],size)){
                index=checkingIndex;
                line=lines[1];
                axis=line===this.fields[index];
                break;
            }
            possible.splice(possible.indexOf(checkingIndex),1);
        }
        console.log(index + " " + axis + " " + line);
        const possiblePositions = this.getShipPos(line, size);
        console.log(possiblePositions);
        const pos = possiblePositions[getRandomNumber(possiblePositions.length)];
        console.log(pos);
        this.deployShip(index, axis, size, pos)
    }

    isLinePossible(line,size){
        let counter = 0;
        for (let i = 0; i < 10; i++) {
            if (line[i] === 0) {
                counter++;
                if (counter === size) {
                    return true;
                }
            } else {
                counter = 0;
            }
        }
        if (counter === size) {
            return true;
        }
        return false;
    }

    getShipPos(line, size) {
        const ships = [];
        let counter = 0;
        let index = null;
        for (let i = 0; i < 10; i++) {
            if (line[i] === 0) {
                if (index === null) {
                    index = i;
                }
                counter++;
            } else {
                if (counter >= size) {
                    for (let j = 0; j < counter - size + 1; j++) {
                        ships.push(index + j);
                    }
                }
                index=null;
                counter = 0;
            }

        }
        console.log("counter"+counter);
        if (counter !== 0) {
            console.log("not 0")
            if (counter >= size) {
                console.log("greater");
                for (let j = 0; j < counter - size + 1; j++) {
                    console.log("pushing")
                    ships.push(index + j);
                }
            }
        }
        return ships;
    }

    getLine(possible) {
        let index = possible[getRandomNumber(possible.length)];
        const axis = getRandomNumber(2);
        if(index===undefined){
            return [null,null,null];
        }
        const output=[];
        console.log(index);
        console.log(this.fields[index]);
        output.push(this.fields[index]);
        const line = []
        for (let i = 0; i < 10; i++) {
            line.push(this.fields[i][index]);
        }
        output.splice(axis,0,line)
        return [index, output];
    }
    deployShip(index, axis, size, pos) {
        if (axis) {
            for (let i = 0; i < size; i++) {
                console.log("setting "+(pos+i));
                this.fields[index][pos + i] = 1;
                forAroundFields(pos + i, index, this.fields, (x, y, fields) => {
                    if (getField(x, y, fields) !== 1) {
                        setField(x, y, fields, 2);
                    }
                })
            }
        } else {
            for (let i = 0; i < size; i++) {
                this.fields[pos + i][index] = 1;
                forAroundFields(index,pos + i, this.fields, (x, y, fields) => {
                    if (getField(x, y, fields) !== 1) {
                        setField(x, y, fields, 2);
                    }
                })
            }
        }
    }

    shoot(pos){
        let output={}
        if (this.getField(pos) === 1) {
            let index;
            this.ships.forEach((ship, i) => {
                ship.forEach((field) => {
                    if (field.pos.x === pos.x && field.pos.y === pos.y) {
                        index = i
                        field.hit = true
                    }
                })
            })
            let ship = this.ships[index]
            let sunken = true;
            for (let i = 0; i < ship.length; i++) {
                if (!ship[i].hit) {
                    sunken = false;
                }
            }
            output={hit: true, sunken: sunken}
        } else {
            output= {hit: false, sunken: false}
        }
        return output
    }

    playerFields=getEmptyFields();
    possibleShips=getEmptyFields();
    hitShip=null;
    takeShot(){
        if(this.hitShip===null){
            const row=this.hitShip
        }
    }
}

export default SmartBot