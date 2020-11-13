const modalWindov = document.getElementById("modal-windov");
const points = document.getElementById("points");
const pointsRes = document.getElementById("points-res");

export default class {

    open() {
        modalWindov.style.display = "inline-block";
        pointsRes.innerText = points.value;
    }
    close() {
        modalWindov.style.display = "none";
    }
}