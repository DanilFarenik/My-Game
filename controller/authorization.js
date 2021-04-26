const dbInterface = require('../model/db');
const cipher = require('./cipher');
const handler = require('./validaror')


module.exports.login = function (req, res) {

    dbInterface.getUsersLogin(req.body.login.trim()).then(result => {

        if (!req.body.password) {
            res.status(400);

            res.json({
                error: "password is defined"
            });
        } else if (cipher.comparison(req.body.password, result.password)) {

            res.json({ userId: result._id, points: result.points });

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

            res.json({ userId: result.ops[0]._id });

        }).catch(err => {
            res.status(400);

            res.json({ status: true, login: "login is already taken" });
        })
    }
}