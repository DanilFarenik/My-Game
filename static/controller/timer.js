import timerDrawing from "../view/timerRedraw.js";
import button from "../view/redrawingButtons.js"
import Modal from "../view/modalWindow.js";

const modalWindow = new Modal();

export default class {
    constructor() {
        this.seconds = 60;
    }

    start() {
        button("stop")
        this.timeKey = setInterval(() => {
            if (this.seconds >= 0) {
                --this.seconds;
            } else {
                clearInterval(this.timeKey);

                modalWindow.open();
            }

            timerDrawing(this.seconds);
        }, 1000)
    }

    stop() {
        button("start");
        clearInterval(this.timeKey);
    }
}