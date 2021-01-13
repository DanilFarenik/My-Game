const express = require('express');
const bodyParser = require('body-parser');

const data = require('./workWithData');

const cookieParser = require('cookie-parser');

const path = require('path');


const app = express();

const user = {
    password: "123123",
    name: "Danil",
}

app.use(cookieParser())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/', function (req, res) {
    if (req.cookies.isAuth) {
        res.sendFile(path.join(__dirname, "/static/index.html"))
    } else {
        res.redirect('/login')
    }
})


app.use(express.static('static'));


app.get('/logout', function (req, res) {
    res.clearCookie('isAuth')

    res.json({ url: 'http://localhost:3000' });
})


app.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname, "/static/login.html"))
})


app.post('/login', function (req, res) {
    if (req.body.password === user.password && req.body.login === user.name) {

        res.cookie('isAuth', req.body.login, { expires: new Date(Date.now() + 86400e3) });

    } else {
        res.status(400);
    }

    res.redirect('/')
})


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
        res.status = 400;
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


app.get('**', function (req, res) {
    res.send("<b>Not fund </b>")
})


app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:${3000}`)
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