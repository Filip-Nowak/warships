import field from "../components/board/field/Field";

class Bot {
    fields = getEmptyFields()
    ships = []

    constructor() {
        this.generateRandomFields()
    }

    generateRandomFields = () => {
        this.addShip(4)
        this.addShip(3)
        this.addShip(3)
        this.addShip(2)
        this.addShip(2)
        this.addShip(2)
        this.addShip(1)
        this.addShip(1)
        this.addShip(1)
        this.addShip(1)
    }
    addShip = (size) => {
        let ship = [];
        let nextFields = []
        for (let i = 0; i < size; i++) {
            let x;
            let y;
            while(true){
                x=getRandomNumber(10)
                y=getRandomNumber(10)
                if(this.isAvailable({x:x,y:y}))
                    break
            }
            if (nextFields.length === 0) {
                ship.push({x: x, y: y})
            }
            nextFields = [];
            for (let j = 0; j < ship.length; j++) {
                let field_x = ship[i].x, field_y = ship[i].y
                if (this.isAvailable({x: field_x + 1, y: field_y})) {
                    nextFields.push({x: field_x + 1, y: field_y})
                }
                if (this.isAvailable({x: field_x - 1, y: field_y})) {
                    nextFields.push({x: field_x - 1, y: field_y})
                }
                if (this.isAvailable({x: field_x, y: field_y + 1})) {
                    nextFields.push({x: field_x, y: field_y + 1})
                }
                if (this.isAvailable({x: field_x, y: field_y - 1})) {
                    nextFields.push({x: field_x, y: field_y - 1})
                }
            }
            ship.push(nextFields[getRandomNumber(nextFields.length)])
            this.setField(ship[ship.length - 1], 1)
        }
        for(let i=0;i<ship.length;i++){
            let x=ship[i].x;
            let y=ship[i].y;
            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    if (this.isAvailable({x:x + i, y:y + j})) {
                        this.setField({x: x + i, y: y + j}, 2);
                    }
                }
            }
        }
    }
    isAvailable = (pos) => {
        return (pos.x >= 0 && pos.y >= 0 && pos.x < 10 && pos.y < 10 && this.getField(pos) === 0)
    }
    getField = (pos) => {
        return this.fields[pos.y][pos.x]
    }
    setField = (pos, value) => {
        this.fields[pos.y][ pos.x] = value
    }
}

const getRandomNumber = (max) => {
    return Math.floor(Math.random() * max)
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
export default Bot