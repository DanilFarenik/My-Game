const { MongoClient, ObjectId } = require('mongodb');

const cipher = require('../controller/cipher');



const dbURI = 'mongodb+srv://server:server@supercluster.n6zx8.mongodb.net/test?retryWrites=true&w=majority';

const collectionNameUser = "users";

let db;
let client;


const mainAdmin = {
    ip: '123.123.43.32',
    login: 'admin123',
    name: 'Admin',
    password: cipher.getHash('qwe123qwe'),
    role: 'admin',
}


const userValidator = {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["ip", "login", "name", "password", "date", "points", "games", "role"],
            properties: {
                ip: { bsonType: "string" },
                login: { bsonType: "string" },
                name: { bsonType: "string" },
                password: { bsonType: "string" },
                points: { bsonType: "number", minimum: 0, maximum: 1000 },
                date: { bsonType: "date" },
                games: { bsonType: "number", minimum: 0 },
                role: { bsonType: "string" },
            }
        }
    },
    validationAction: "error"
}


module.exports.connectDb = () => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(dbURI, { useNewUrlParser: true }, (err, database) => {
            if (err) {
                reject(err);
            }

            db = database.db('cubeGame');

            client = database;

            isThereCollectionUser();

            resolve()
        })
    })
}


const isThereCollectionUser = () => {
    db.listCollections().toArray((error, collections) => {
        if (error) {
            (`ERROR: ${err.message}`);
            throw err;
        }

        let collectionFlag = true;

        collections.forEach(collection => {
            if (collection.name === collectionNameUser) {
                collectionFlag = false;
            }
        })


        if (collectionFlag) {
            ('User collection not found');

            db.createCollection(collectionNameUser, userValidator, (err, res) => {
                if (err) {
                    (`ERROR: ${err.message}`);
                    throw err;
                }

                ('User collection created ');
            })

            db.collection(collectionNameUser).createIndex({ login: 1 }, { unique: true });


            setUser(mainAdmin);
        } else {
            ('User collection found')
        }
    });
}


module.exports.replaseStatus = ({ id, roleFlag }) => {
    return db.collection(collectionNameUser).updateOne(
        { _id: ObjectId(id) },
        {
            $set: {
                role: roleFlag ? 'admin' : 'player'
            }
        }
    )
}


module.exports.thisIsAdmin = async (id) => {
    return await db.collection(collectionNameUser).findOne(
        { _id: ObjectId(id) },
        { projection: { _id: 0, role: 1 } }
    );
}


module.exports.numberPages = async (reg = '') => {
    return await db.collection(collectionNameUser).find({
        $or: [
            { login: { $regex: `${reg}` } },
            { name: { $regex: `${reg}` } }
        ]
    }).count()
}


module.exports.admin_getUserData = async ({ page, sortField, reg }) => {
    return await db.collection(collectionNameUser).find({
        $or: [
            { login: { $regex: `${reg}` } },
            { name: { $regex: `${reg}` } }
        ]
    }, {
        projection: {
            _id: 1,
            name: 1,
            points: 1,
            ip: 1,
            login: 1,
            date: 1,
            games: 1,
            role: 1,
        },
    })
        .sort({ [sortField]: sortField === 'name' ? 1 : -1 })
        .skip(page * 10)
        .limit(10);
}


module.exports.getUsersLogin = (login) => {
    return db.collection(collectionNameUser).findOne({
        login: login,
    })
}




function setUser({ ip, login, name, password, role = "player" }) {
    return new Promise((resolve, reject) => {
        db.collection(collectionNameUser).insertOne({
            ip: ip,
            login: login,
            name: name,
            password: password,
            points: 0,
            date: new Date(),
            games: 0,
            role: role,
        }, (err, res) => {
            if (err) reject(err);

            resolve(res);
        })
    })
}


module.exports.setUser = setUser;


module.exports.getUser = (id) => {
    try {
        return db.collection(collectionNameUser).findOne({
            _id: ObjectId(id)
        }, {
            projection: {
                _id: 0,
                name: 1,
                role: 1,
                points: 1,
            }
        })
    } catch (err) {
        return new Promise((res, rej) => rej(err))
    }
}


module.exports.getRecords = () => {
    return new Promise((resolve, reject) => {
        db.collection(collectionNameUser)
            .find({}, {
                projection: {
                    _id: 0,
                    name: 1,
                    points: 1
                }
            })
            .sort({ points: -1 })
            .limit(10)
            .toArray(function (err, result) {
                if (err) reject(err);

                resolve(result)
            });
    })
}


module.exports.setRecords = (id, points) => {
    return new Promise((resolve, reject) => {
        db.collection(collectionNameUser).updateOne(
            { _id: ObjectId(id) },
            {
                $set: { points: points },
                $inc: { games: 1 }
            },
            function (err, result) {
                if (err) reject(err);

                resolve(result)
            });
    })
}


module.exports.dbClose = () => {
    client.close()
}