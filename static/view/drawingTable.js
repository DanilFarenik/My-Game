const table = document.getElementById("table");

export default function (names) {
    table.innerHTML = "";

    let item = Object.entries(names).sort((a, b) => b[1] - a[1]);

    for (let [key, value] of item) {
        let tr = document.createElement("tr");

        let tdKey = document.createElement("td");
        let tdValue = document.createElement("td");

        tdKey.innerText = key;
        tdValue.innerText = value;

        tr.append(tdKey)
        tr.append(tdValue)

        if (key.length < 15) table.append(tr);
    }
}