export default class {
    constructor() {
        this.names = [];
    }

    getRating() {
        fetch("http://localhost:3000/getRecords")
            .then(res => res.json())
            .then(res => {
                console.log(res);
            })
    }

    setRating(name, points) {
        let data = {
            points: points,
            name: name
        }

        fetch("http://localhost:3000/setRecords", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        }).then(res => {
            //console.log(res);
        })
    }
}



