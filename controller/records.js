
const dbInterface = require('../model/db');

const url = `http://localhost:3097`;


module.exports.getRecords = function (req, res) {

    Promise.all([dbInterface.getRecords(), dbInterface.getUser(req.cookies.isAuth)])
        .then(([records, user]) => {

            res.json({
                records: records,
                user: user
            });

        }).catch(err => {
            res.clearCookie('isAuth');

            res.json({ error: `server access problem.`, url: url })
        })
}


module.exports.setRecords = function (req, res) {

    if (!req.cookies.isAuth) {

        res.json({ url: url });

    } else if (req.body.points < 0 || req.body.points > 1000) {

        res.json({ status: true, error: "very unusual number of points" });

    } else {

        dbInterface.setRecords(req.cookies.isAuth, req.body.points)
            .then(result => {

                if (result === null) {
                    res.clearCookie('isAuth').status(400);

                    res.json({ url: url, error: "user is not found" });
                } else {
                    res.json({ ok: true });
                }

            }).catch(err => {
                console.log(`ERROR: database access problem. ${err.message}`);

                res.clearCookie('isAuth');

                res.json({ error: `server access problem.`, url: url })
            })
    }
}
