const table = document.getElementById("table");


export default function (users) {
    table.innerHTML = "";

    table.append(tableElement({
        _id: "id",
        ip: "ip",
        login: "login",
        name: "name",
        points: "points",
        date: "date",
        games: "games",
        role: "role",
    }, 'th'))

    for (let item of users) {
        table.append(tableElement(item))
    }
}

function tableElement(item, elem = 'td') {
    let tr = document.createElement('tr');

    for (let value of Object.values(item)) {

        let cell = document.createElement(elem)

        cell.innerHTML = value;

        tr.append(cell)
    }

    return tr;
}