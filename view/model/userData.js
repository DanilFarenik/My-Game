export default class {
    constructor() {
        this.names;
        this.user;
    }


    getRating() {
        return fetch("http://localhost:3097/getRecords").then(res => {
            if (res.status === 500) {
                alert(`ERROR: the server does not respond`)

                console.error(res);
            } else {
                return res.json();
            }

        }).then(res => {

            console.log(res);

            if (res.url) {
                alert(`ERROR: invalid authorization key`)

                window.location.replace(res.url);
            }

            this.names = res.records;

            this.name = res.user;

            return res;
        })
    }


    setRating(points) {
        let data = {
            points: points,
        }


        return fetch("http://localhost:3097/setRecords", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        }).then(res => {

            if (res.status !== 200) {
                alert(`ERROR: the server does not respond.\nSorry, the result is not saved`);
            }

            return res.json();

        }).then(res => {

            if (res.status) {
                alert(`ERROR: ${res.error}`)

                console.error(res);
            }

            if (res.url) {
                window.location.replace(res.url);
            }
        })
    }
}