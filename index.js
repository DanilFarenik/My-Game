const express = require('express');
const bodyParser = require('body-parser');

const data = require('./workWithData');


const app = express();


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use(express.static('static'));


app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:${3000}`)
});



app.get('/getRecords', function (req, res) {
    data.getRating().then(response => {

        res.json(response.splice(0, 10));

    }).catch((err) => {
        res.status = 500;
        res.json(err);
    })
});



app.post('/setRecords', function (req, res) {

    let err = validator(req.body);

    if (err.status) {
        res.status = 500;
        res.json(err);
    } else {
        data.setRating(req.body).then(response => {

            res.json(response);

        }).catch(err => {
            res.status = 500;
            res.json(err);
        })
    }
});

function validator({ name, points }) {
    let err = { message: '', status: false };

    if (points > 999 || points < 0) {
        err.message += 'Points is not valid \n';
        err.status = true;
    }

    if (!/^[a-zA-Z][a-zA-Z0-9-_\.]{3,20}$/.test(name)) {
        err.message += 'Name is not valid \n';
        err.status = true;
    }

    if (!points) {
        err.message += 'Points is not defined \n';
        err.status = true;
    }

    if (!name) {
        err.message += 'Name is not defined \n';
        err.status = true;
    }

    return err;
}