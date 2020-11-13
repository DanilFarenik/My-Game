export default class {
    constructor() {
        this.errorList = document.getElementById("error")
    }

    addError(err) {
        this.errorList.innerText = err;
    }

    closeError() {
        this.errorList = "";
    }
}