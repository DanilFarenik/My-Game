import './entrance.js';

import Data from "../model/userData.js";
import Timer from "./timer.js";
import Modal from "../view/modalWindow.js";
import Game from "./gameLogic.js";
import drawingTable from "../view/drawingTable.js"
import timerRes from "../view/timeRestart.js";
import fieldCleaning from "../view/fieldCleaning.js";


const start = document.getElementById("start");
const newGame = document.getElementById("new-game");
const points = document.getElementById("points");
const submit = document.getElementById("submit");
const name = document.getElementById("name");
const notSubmit = document.getElementById("notSubmit");
const userStat = document.getElementById("userStat");


let game = new Game();
let timeSet = new Timer();
const dataRetrieval = new Data();
const modalWindow = new Modal();

let flagStart = true;
let flag = true;


dataRetrieval.getRating().then(res => {
    drawingTable(res.records);

    name.value = res.user.name;

    userStat.innerHTML = `${res.user.name}: ${res.user.points}`;
})



function gameRestart() {
    timerRes();
    fieldCleaning();

    game.stop();
    timeSet.stop();

    timeSet = new Timer();

    flagStart = true;
    flag = true;

    points.value = 0;
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

    dataRetrieval.setRating(Number(points.value)).then(() => {

        dataRetrieval.getRating().then(res => {
            drawingTable(res.records);

            name.value = res.user.name;

            userStat.innerHTML = `${res.user.name}: ${res.user.points}`;
        })
    });

    modalWindow.close();

    gameRestart();
})

notSubmit.addEventListener("click", () => {

    modalWindow.close();

    gameRestart();

})