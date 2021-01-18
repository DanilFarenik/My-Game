const path = require('path');


const dbInterface = require('../model/db');
const cipher = require('./cipher');
const handler = require('./validaror')


const url = `http://localhost:3097`


module.exports.mainRoute = function (req, res) {
    if (req.cookies.isAuth) {
        res.sendFile(path.join(__dirname, "../view/index.html"))
    } else {
        res.redirect('/login')
    }
}


module.exports.logout = function (req, res) {
    res.clearCookie('isAuth');

    res.json({ url: url });
}


module.exports.loginСheck = function (req, res) {
    if (!req.cookies.isAuth) {
        res.sendFile(path.join(__dirname, "../view/login.html"));
    } else {
        res.redirect('/');
    }
}


module.exports.login = function (req, res) {

    dbInterface.getUsers(req.body.login.trim()).then(result => {

        if (!req.body.password) {
            res.status(400);

            res.json({
                error: "password is defined"
            });
        } else if (cipher.comparison(req.body.password, result.password)) {

            res.cookie('isAuth', result._id, { expires: new Date(Date.now() + 86400e3) });

            res.status(300);

            res.json({ url: url });

        } else {
            res.status(400);

            res.json({
                error: "password is not correct"
            });
        }
    }).catch(err => {
        res.status(400);

        res.json({
            error: "login is not correct"
        });
    })
}


module.exports.register = function (req, res) {

    const data = handler.sanitize(req.body, req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress)

    let err = handler.validator(data);


    if (err.status) {
        res.status(400);

        res.json(err);
    } else {
        data.password = cipher.getHash(data.password);

        dbInterface.setUser(data).then(result => {
            res.cookie('isAuth', result.ops[0]._id, { expires: new Date(Date.now() + 86400e3) });

            res.json({ url: url });
        }).catch(err => {
            res.status(400);

            res.json({ status: true, login: "login is already taken" });
        })
    }
}