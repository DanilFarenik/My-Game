const fs = require("fs")

module.exports.getRating = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('./rating.json', 'utf8', function (err, data) {
            if (err) {
                console.error(err);

                reject(err);
            }

            resolve(data ? JSON.parse(data) : [])
        });
    });
}


module.exports.setRating = item => {
    return new Promise((resolve, reject) => {
        fs.readFile('./rating.json', 'utf8', function (err, data) {
            if (err) {
                console.error(err);

                reject(err);
            }

            const rating = data ? JSON.parse(data) : [];
            rating.push(item);

            resolve(rating);
        });
    })
        .then(rating => ratingSort(rating))
        .then(rating => setDataFile(rating));
}

function ratingSort(rating) {
    return rating.sort((a, b) => a.points - b.points)
}

function setDataFile(rating) {
    return new Promise((resolve, reject) => {
        fs.writeFile("./rating.json", JSON.stringify(rating), function (err) {
            if (err) {
                console.error(err);

                reject(err);
            }

            resolve({ ok: true });
        });
    })
}