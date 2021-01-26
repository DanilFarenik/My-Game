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
        btn: "change status"
    }, 'th'))

    for (let item of users) {
        table.append(tableElement(item, 'td', true))
    }
}

function tableElement(item, elem = 'td', plug) {

    let tr = document.createElement('tr');

    for (let value of Object.values(item)) {

        let cell = document.createElement(elem)

        cell.innerHTML = value;

        tr.append(cell)
    }

    if (plug) {
        let btn = document.createElement('button');

        btn.dataset.id = item._id;
        btn.dataset.role = item.role;

        btn.innerText = 'change status'

        btn.classList.add('btn', 'btn-secondary', 'm-1')

        tr.append(btn)
    }

    return tr;
}