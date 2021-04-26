
const dbInterface = require('../model/db');


module.exports.getRecords = function (req, res) {

    Promise.all([dbInterface.getRecords(), dbInterface.getUser(req.body.id)]).then(([records, user]) => {

        if (user === null) {

            res.status(402).json({ error: `Server access problem.`, exit: true })
        } else {
            res.json({
                records: records,
                user: user
            });
        }
    }).catch(err => {
        res.status(402).json({ error: `Server access problem.` })
    })
}


module.exports.setRecords = function (req, res) {

    if (req.body.points < 0 || req.body.points > 1000) {

        res.json({ status: true, error: "very unusual number of points" });

    } else {

        dbInterface.setRecords(req.body.id, req.body.points).then(result => {
            if (result === null) {
                res.status(402).json({ url: url, error: "user is not found" });
            } else {
                res.json({ ok: true });
            }
        }).catch(err => {
            console.log(`ERROR: database access problem. ${err.message}`);

            res.json({ error: `server access problem.` })
        })
    }
}
