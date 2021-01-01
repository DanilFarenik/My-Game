const table = document.getElementById("table");

export default function (items) {
    table.innerHTML = ``;

    table.append(
        generateTag("tr", "th", "points", "name")
    )


    for (let { points, name } of items) {
        table.append(
            generateTag("tr", "td", points, name)
        );
    }
}

function generateTag(tag, tagChild, points, name) {
    let element = document.createElement(tag);

    let tdName = document.createElement(tagChild);
    let tdPoints = document.createElement(tagChild);

    tdName.innerText = name;
    tdPoints.innerText = points;

    element.append(tdName);
    element.append(tdPoints);

    return element;
}