export default class {
    constructor() {
        this.names = [];
    }

    getName() {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + "isAuth".replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    getRating() {
        return fetch("http://localhost:3000/getRecords")
            .then(res => {
                if (res.status != 200) {
                    alert(`ERROR: the server does not respond`)
                    console.error(res);
                    return [];
                } else {
                    return res.json();
                }
            })
            .then(res => {
                this.names = res;
                return res;
            })
    }

    setRating(name, points) {
        let data = {
            points: points,
            name: name
        }

        addUser(this.names, data)

        this.names = this.names.sort((a, b) => b.points - a.points).splice(0, 10);


        fetch("http://localhost:3000/setRecords", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                if (res.status) {
                    alert(`ERROR: ${res.message}`)
                    console.error(res);
                }
            })
    }
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

