export default class {
    constructor() {
        this.names = sessionStorage;
    }

    setName(name, points) {
        sessionStorage[name] = points;
    }
}



