import RandomCube from "./creatingСubes.js";
import Draeing from "../view/drawingCubes.js";

const playingField = document.getElementById("main");
const points = document.getElementById("points");

let cubePoints = [3, 2, 1]

let x = main.offsetWidth;
let y = main.offsetHeight;

let randomCube = new RandomCube(x, y);
const draeing = new Draeing();

function game(e) {
    if (e.target.tagName == "DIV") {

        points.value = +points.value + cubePoints[e.target.dataset.type]

        e.target.remove();

        draeing.drawingCube(randomCube.getRandomCoordinates());
    }
}

window.addEventListener("resize", () => {
    x = main.offsetWidth;
    y = main.offsetHeight;

    console.log(x, y);

    randomCube = new RandomCube(x, y);
})

export default class {
    start() {
        for (let i = 0; i < 3; i++) {
            draeing.drawingCube(randomCube.getRandomCoordinates());
        }

        playingField.addEventListener("click", game);
    }

    play() {
        playingField.addEventListener("click", game);
    }

    stop() {
        playingField.removeEventListener("click", game);
    }
}

