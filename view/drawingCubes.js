export default class {
    constructor() {
        this.main = document.getElementById("main");
        this.cubesColor = ["cube-red", "cube-blue", "cube-green"];
    }

    drawingCube({ x, y, type }) {
        let cube = document.createElement("div");

        this.main.append(cube);

        cube.dataset.type = type;

        cube.classList.add(this.cubesColor[type]);
        cube.style.left = `${x}px`;
        cube.style.top = `${y}px`;
    }
}