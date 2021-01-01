export default class {
    constructor(x, y) {
        this.x = x - 30;
        this.y = y - 30;
    }

    getRandomCoordinates() {
        return {
            type: Math.floor(Math.random() * 3),
            x: Math.floor(Math.random() * (this.x - 10) + 10),
            y: Math.floor(Math.random() * (this.y - 10) + 10)
        }
    }
}