import getEmptyFields from "../components/utils/getEmptyFields";

class BotEnemy{
    fields = getEmptyFields()
    ships = []
    handleEnemyHit

    constructor(handleEnemyHit) {
        this.handleEnemyHit = handleEnemyHit
        this.generateRandomFields()
    }

    takeShot = () => {
        setTimeout(() => {
            let x = getRandomNumber(10);
            let y = getRandomNumber(10);
            this.handleEnemyHit({x: x, y: y})
        },500)
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
        console.log(this.fields)
    }
    addShip = (size) => {
        let ship = [];
        let nextFields = []
        let x;
        let y;
        while (true) {
            x = getRandomNumber(10)
            y = getRandomNumber(10)
            if (this.isAvailable({x: x, y: y})) {
                if (this.isEnoughSpace({x: x, y: y}, size))
                    break
            }
        }
        for (let i = 0; i < size; i++) {

            if (i === 0) {
                ship.push({pos: {x: x, y: y}, hit: false})
            } else {
                nextFields = [];
                for (let j = 0; j < ship.length; j++) {
                    let field_x = ship[j].pos.x, field_y = ship[j].pos.y
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
                ship.push({pos: {...nextFields[getRandomNumber(nextFields.length)]}, hit: false})
                // console.log(ship[ship.length - 1])
            }
            this.setField(ship[ship.length - 1].pos, 1)

        }
        for (let i = 0; i < ship.length; i++) {
            let x = ship[i].pos.x;
            let y = ship[i].pos.y;
            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    if (this.isAvailable({x: x + i, y: y + j})) {
                        this.setField({x: x + i, y: y + j}, 2);
                    }
                }
            }
        }
        this.ships.push(ship)
    }
    isAvailable = (pos) => {
        return (pos.x >= 0 && pos.y >= 0 && pos.x < 10 && pos.y < 10 && this.getField(pos) === 0)
    }
    getField = (pos) => {
        return this.fields[pos.y][pos.x]
    }
    setField = (pos, value) => {
        this.fields[pos.y][pos.x] = value
    }
    //todo already hit
    shoot = (pos) => {
        console.log(this.fields)
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
            if (sunken)
                console.log("sunken")
            else
                console.log("hit")
            output={hit: true, sunken: sunken}
        } else {
            console.log("missed")
            output= {hit: false, sunken: false}
        }
        return output
    }
    printFields = () => {
        let output = ""
        for (let y = 0; y < 10; y++) {
            for (let x = 0; x < 10; x++) {
                output += this.getField({x: x, y: y})
            }
            output += "\n"
        }
        console.log(output)
    }
    printShip = (ship) => {
        let output = "ship: "
        for (let i = 0; i < ship.length; i++) {
            output += "[" + ship[i].pos.x + ", " + ship[i].pos.y + "]"
        }
        console.log(output)
    }
    isEnoughSpace = (pos, size) => {
        let space = 0;
        this.setField(pos, 5)
        space = this.checkSpace(pos)
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                if (this.getField({x: i, y: j}) === 5)
                    this.setField({x: i, y: j}, 0)
            }
        }
        return !(space < size)
    }
    checkSpace = (pos) => {
        let space = 1
        let x = pos.x;
        let y = pos.y;
        if (this.isAvailable({x: x + 1, y: y})) {
            this.setField({x: x + 1, y}, 5)
            space += this.checkSpace({x: x + 1, y: y});
        }
        if (this.isAvailable({x: x - 1, y: y})) {
            this.setField({x: x - 1, y: y}, 5)
            space += this.checkSpace({x: x - 1, y: y});
        }
        if (this.isAvailable({x: x, y: y + 1})) {
            this.setField({x: x, y: y + 1}, 5)
            space += this.checkSpace({x: x, y: y + 1});
        }
        if (this.isAvailable({x: x, y: y - 1})) {
            this.setField({x: x, y: y - 1}, 5)
            space += this.checkSpace({x: x, y: y - 1});
        }
        return space
    }
}

const getRandomNumber = (max) => {
    return Math.floor(Math.random() * max)
}
export default BotEnemy