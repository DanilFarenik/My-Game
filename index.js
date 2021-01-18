const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


const authorizationController = require("./controller/authorization");
const dataRecords = require("./controller/records");

const dbInterface = require('./model/db');



const app = express();

const port = 3097;

//const url = `http://localhost:${port}`


app.use(cookieParser())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', authorizationController.mainRoute);


app.use(express.static('view'));


app.get('/logout', authorizationController.logout);


app.get('/login', authorizationController.loginСheck);


app.post('/login', authorizationController.login);


app.post('/register', authorizationController.register)


app.get('/getRecords', dataRecords.getRecords);


app.post('/setRecords', dataRecords.setRecords);


app.get('**', function (req, res) {
    res.send("<b>Not fund</b>")
})


dbInterface.connectDb().then(() => {

    app.listen(port, () => {
        console.log(`Example app listening http://localhost:3097`)
    });

}).catch(err => {
    console.log(err.message);
})