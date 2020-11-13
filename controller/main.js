import Data from "../model/nameData.js";
import Timer from "./timer.js";
import Modal from "../view/modalWindow.js"
import Game from "./gameLogic.js";

import drawingTable from "../view/drawingTable.js"
import valid from "./nameValidator.js";
import timerRes from "../view/timeRestart.js";
import fieldCleaning from "../view/fieldCleaning.js";


const start = document.getElementById("start");
const newGame = document.getElementById("new-game");
const points = document.getElementById("points");
const submit = document.getElementById("submit")
const name = document.getElementById("name")


let game = new Game();
let timeSet = new Timer();
const dataRetrieval = new Data();
const modalWindow = new Modal();

drawingTable(dataRetrieval.names);


let flagStart = true;
let flag = true;

function gameRestart() {
    timerRes();
    fieldCleaning();

    game.stop();
    timeSet.stop();

    timeSet = new Timer();

    flagStart = true;
    flag = true;

    points.value = 0;
    name.value = "";
}


newGame.addEventListener("click", gameRestart)


start.addEventListener("click", () => {
    if (flagStart) {
        flagStart = false;

        game.start();
        timeSet.start();
    } else {
        if (flag) {
            game.play();
            timeSet.start();
        } else {
            game.stop();
            timeSet.stop();
        }
    }

    flag = !flag;
})


submit.addEventListener("click", () => {
    if (valid(name.value)) {
        let obj = { [name.value]: points.value }

        dataRetrieval.setName(name.value, points.value);

        drawingTable(obj);

        modalWindow.close();

        gameRestart();
    }
})