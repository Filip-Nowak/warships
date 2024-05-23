import {
    cloneFields,
    forAroundFields, forCrossFields, getEmptyFields,
    getField,
    getRandomNumber, setField
} from "../board/boardUitils";
import BotShooter from "./BotShooter";

class SmartBot {
    fields = getEmptyFields()
    botShooter;

    constructor(handleShot) {
        this.generateRandomFields()
        this.botShooter=new BotShooter(this.fields,handleShot);
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
        for(let i=0;i<10;i++){
            for(let j=0;j<10;j++){
                if(this.fields[i][j]===2){
                    this.fields[i][j]=0;
                }
            }
        }
    }

    addShip(size, index2, axis2) {
        const possible = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        let line = [];
        let index;
        let axis;
        while (true) {
            const [checkingIndex, lines] = this.getLine(possible);
            if (this.isLinePossible(lines[0], size)) {
                index = checkingIndex;
                line = lines[0];
                axis = line === this.fields[index];
                break
            }
            if (this.isLinePossible(lines[1], size)) {
                index = checkingIndex;
                line = lines[1];
                axis = line === this.fields[index];
                break;
            }
            possible.splice(possible.indexOf(checkingIndex), 1);
        }
        const possiblePositions = this.getShipPos(line, size);
        const pos = possiblePositions[getRandomNumber(possiblePositions.length)];
        this.deployShip(index, axis, size, pos)
    }

    isLinePossible(line, size) {
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
                index = null;
                counter = 0;
            }

        }
        if (counter !== 0) {
            if (counter >= size) {
                for (let j = 0; j < counter - size + 1; j++) {
                    ships.push(index + j);
                }
            }
        }
        return ships;
    }

    getLine(possible) {
        let index = possible[getRandomNumber(possible.length)];
        const axis = getRandomNumber(2);
        if (index === undefined) {
            return [null, null, null];
        }
        const output = [];
        output.push(this.fields[index]);
        const line = []
        for (let i = 0; i < 10; i++) {
            line.push(this.fields[i][index]);
        }
        output.splice(axis, 0, line)
        return [index, output];
    }

    deployShip(index, axis, size, pos) {
        if (axis) {
            for (let i = 0; i < size; i++) {
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
                forAroundFields(index, pos + i, this.fields, (x, y, fields) => {
                    if (getField(x, y, fields) !== 1) {
                        setField(x, y, fields, 2);
                    }
                })
            }
        }
    }

    shoot({x,y}) {
        let output = {}
        if (this.fields[y][x]===1) {
            this.fields[y][x]=2;
            let sunken=true;
            const callback = (x, y, fields) => {
                if (getField(x, y, fields) === 2) {
                    fields[y][x] = 5
                    forCrossFields(x, y, fields, callback)
                }else if(getField(x,y,fields) === 1){
                    sunken=false;
                }
            }
            const clonedFields=cloneFields(this.fields);
            forCrossFields(x, y, clonedFields, callback)
            output={hit:true,sunken:sunken};
        } else {
            output = {hit: false, sunken: false}
        }
        return output
    }

    takeShot(x,y){
        this.botShooter.takeShot(x,y);
    }
    shotResult(result,pos){
        this.botShooter.shotResult(result,pos);
    }




}

export default SmartBot