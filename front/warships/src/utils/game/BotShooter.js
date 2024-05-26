import {getEmptyFields, getRandomNumber} from "../board/boardUitils";

export default class BotShooter {
    fields
    playerFields = getEmptyFields();
    possibleLines = {}
    hitShip = null;

    constructor(fields, handleShot) {
        this.handleShot = handleShot
        this.fields = fields;
        for (let i = 0; i < 10; i++) {
            this.possibleLines[i] = [];
            for (let j = 0; j < 10; j++) {
                this.possibleLines[i].push(j);
            }
        }
    }

    takeShot(position) {
        if (this.hitShip === null) {
            if (position !== undefined) {
                this.handleShot(position)
                return
            }
            const [x, y] = this.getRandomPos();
            this.handleShot({x: x, y: y});
        } else {
            const pos = this.possibleContinues[getRandomNumber(this.possibleContinues.length)];
            this.handleShot(pos);

        }

    }

    getRandomPos() {
        const keys = Object.keys(this.possibleLines);
        let x = keys[getRandomNumber(keys.length)];
        const index = getRandomNumber(this.possibleLines[x].length);
        let y = this.possibleLines[x][index];
        return [x, y];
    }


    shotResult(result, {x, y}) {
        if (result === 1) {
            if (this.hitShip === null)
                this.hitShip = [];
            this.hitShip.push({x:parseInt(x), y:y})
        } else if (result === 2) {
            if(this.hitShip===null){
                this.hitShip=[{x:x, y:y}];
            }
            this.removePossibleFields();
            this.hitShip = null;
        }
        this.removeField(x, y)
        this.possibleContinues = [];
        if (this.hitShip !== null) {
            if (this.hitShip.length === 1) {
                this.possibleContinues = this.getCrossFields(this.hitShip[0].x, this.hitShip[0].y)
            } else {
                let first = this.hitShip[0];
                let last = this.hitShip[0];
                for (let i = 1; i < this.hitShip.length; i++) {
                    const pos = this.hitShip[i];
                    if (pos.x < first.x || pos.y < first.y) {
                        first = pos;
                    }
                    if (pos.x > last.x || pos.y > last.y) {
                        last = pos;
                    }
                }
                if (first.x === last.x) {
                    this.possibleContinues.push(this.checkField(first.x, first.y - 1));
                    this.possibleContinues.push(this.checkField(last.x, last.y + 1));
                    this.possibleContinues = this.possibleContinues.filter(v => v !== null)
                } else {
                    this.possibleContinues.push(this.checkField(first.x - 1, first.y));
                    this.possibleContinues.push(this.checkField(last.x + 1, last.y));
                    this.possibleContinues = this.possibleContinues.filter(v => v !== null)
                }

            }
        }
    }


    removePossibleFields() {
        for (let i = 0; i < this.hitShip.length; i++) {
            const {x, y} = this.hitShip[i];
            for (let k = -1; k < 2; k++) {
                for (let j = -1; j < 2; j++) {
                    this.removeField(x + k, y + j);
                }
            }
        }
    }

    removeField(x, y) {
        const line = this.possibleLines[x];
        if (line !== undefined) {
            const index = this.possibleLines[x].indexOf(y);
            if (index !== -1) {
                this.possibleLines[x].splice(index, 1);
            }
            if(this.possibleLines[x].length===0){
                delete this.possibleLines[x];
            }
        }

    }

    getCrossFields(x, y) {
        const fields = [];
        fields.push(this.checkField(parseInt(x) + 1, y));
        fields.push(this.checkField(parseInt(x) - 1, y));
        fields.push(this.checkField(parseInt(x), y + 1));
        fields.push(this.checkField(parseInt(x), y - 1));
        return fields.filter(v => v !== null)

    }

    possibleContinues = []

    checkField(x, y) {
        const line = this.possibleLines[x];
        if (line !== undefined) {
            const index = line.indexOf(y);
            if (index !== -1) {
                return {x: parseInt(x), y: y};
            }
        }
        return null;
    }

}