const fs = require("fs")

module.exports.getRating = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('./data/rating.json', 'utf8', function (err, data) {
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
        fs.readFile('./data/rating.json', 'utf8', function (err, data) {
            if (err) {
                console.error(err);

                reject(err);
            }

            const rating = data ? JSON.parse(data) : [];

            resolve(addUser(rating, item));
        });
    })
        .then(rating => ratingSort(rating))
        .then(rating => setDataFile(rating));
}

function addUser(rating, user) {
    let flag = true;
    for (let i = 0; i < rating.length; i++) {
        if (rating[i].name === user.name) {
            rating[i].points = user.points;

            flag = false;
            break;
        }
    }

    if (flag) {
        rating.push(user);
    }

    return rating;
}

function ratingSort(rating) {
    return rating.sort((a, b) => b.points - a.points)
}

function setDataFile(rating) {
    return new Promise((resolve, reject) => {
        fs.writeFile("./data/rating.json", JSON.stringify(rating), function (err) {
            if (err) {
                console.error(err);

                reject(err);
            }

            resolve({ ok: true });
        });
    })
}