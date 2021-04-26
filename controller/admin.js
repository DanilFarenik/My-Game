const path = require('path');


const dbInterface = require('../model/db');
const validator = require('./validaror');

const url = `http://localhost:3001`


function thisIsAdmin(req, res) {
    return dbInterface.thisIsAdmin(req.cookies.isAuth).then(result => {

        if (result === null) {

            res.clearCookie('isAuth');

        } else if (result.role === 'admin') {

            return true;

        }
    })
}


module.exports.changeOfStatus = (req, res) => {
    thisIsAdmin(req, res).then(result => {
        if (result) {

            replaseStatus(req, res);

        } else {

            res.json({ url: url });

        }
    }).catch(err => {
        res.json({ url: url });
    })
}


module.exports.getPage = (req, res) => {
    thisIsAdmin(req, res).then(result => {
        if (result) {

            res.sendFile(path.join(__dirname, "../view/admin.html"));

        } else {

            res.redirect('/');

        }
    }).catch(err => {
        res.redirect('/');
    })
}


module.exports.getUsersData = (req, res) => {
    thisIsAdmin(req, res).then(result => {
        if (result) {

            dataCollection(req.body).then(({ options, totalPages }) => {

                if (options.status) throw options;


                dataPreparation(options, totalPages, res);

            }).catch(err => {

                res.status(400);

                res.json(err);

            })
        } else {
            res.json({ url: url });
        }
    }).catch(err => {
        res.json({ url: url });
    })

}


function replaseStatus(req, res) {
    return dbInterface.thisIsAdmin(req.body.id).then(result => {

        if (result === null) {

            res.status(400);
            res.json({ error: 'User not found' });

        } else if (req.body.password === 'qwe123qwe') {

            dbInterface.replaseStatus(req.body).then(result => {

                res.json({ ok: true })

            }).catch(err => {

                res.status(500)
                res.json({ error: 'Server error' });

            })

        } else {
            res.json({
                error: 'Access denied'
            });
        }
    }).catch((err) => {

        res.status(500)
        res.json({ error: 'Server error' });

    })

}


function dataCollection(data) {
    return dbInterface.numberPages(data.reg).then(result => {

        const page = Math.ceil(result / 10);

        const options = validator.adminParameter(data, page);

        return {
            options: options,
            totalPages: page
        };

    })
}


function dataPreparation(options, totalPages, res) {
    dbInterface.admin_getUserData(options).then(result => {


        result.toArray((error, collections) => {
            if (error) throw error;


            res.json({
                totalPages: totalPages,
                page: options.page,
                users: collections
            })
        })


    }).catch(err => {
        console.log("RESULT cath", err);

        res.status(500)
        res.json(err)
    })
}