const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


const authorizationController = require("./controller/authorization");
const dataRecords = require("./controller/records");
const admin = require("./controller/admin");

const dbInterface = require('./model/db');


const app = express();

const port = 3001;


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();

    app.options('*', (req, res) => {

        res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
        res.send();
    });
});

app.use(cookieParser())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('view'));


app.post('/login', authorizationController.login);


app.post('/register', authorizationController.register)


app.post('/records/get', dataRecords.getRecords);


app.post('/records/set', dataRecords.setRecords);


app.get('/admin', admin.getPage);


app.post('/admin', admin.getUsersData);


app.post('/admin/change', admin.changeOfStatus);


app.get('**', function (req, res) {
    res.send("<b>Not fund</b>")
})


dbInterface.connectDb().then(() => {

    app.listen(port, () => {
        console.log(`Example app listening http://localhost:3001`)
    });

}).catch(err => {
    console.log(err.message);
})