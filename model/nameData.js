export default class {
    constructor() {
        this.names = localStorage;
    }

    setName(name, points) {
        localStorage[name] = points;
    }
}



