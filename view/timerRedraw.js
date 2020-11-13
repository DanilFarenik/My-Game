const timer = document.getElementById("time");

export default function (time) {
    if (time <= 0) {
        timer.value = "00:00";
        return;
    }
    timer.value = `00:${Math.floor(time / 10) != 0 ? time : "0" + time}`
}