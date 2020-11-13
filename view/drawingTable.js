const table = document.getElementById("table");

export default function (names) {
    let out = "";
    for (let [key, value] of Object.entries(names)) {
        let tr = document.createElement("tr");
        tr.innerHTML = `
        <tr>
            <td>${key}</td>
            <td>${value}</td>
        </tr>
        `
        if (key.length < 15) table.append(tr);
    }
}