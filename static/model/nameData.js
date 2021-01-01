export default class {
    constructor() {
        this.names = [];
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

        this.names.push(data)

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



