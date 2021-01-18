const { MongoClient, ObjectId } = require('mongodb');

const dbURI = 'mongodb+srv://server:server@supercluster.n6zx8.mongodb.net/test?retryWrites=true&w=majority';

const collectionNameUser = "users";

let db;
let client;

const userValidator = {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["ip", "login", "name", "password", "date", "points"],
            properties: {
                ip: { bsonType: "string" },
                login: { bsonType: "string" },
                name: { bsonType: "string" },
                password: { bsonType: "string" },
                points: { bsonType: "number", minimum: 0, maximum: 1000 },
                date: { bsonType: "date" }
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
            //module.exports.getRecords()
            // module.exports.setRecords("6002fe8c0050752cf46cb5f9", 132)
            //module.exports.getUser("6002fe8c0050752cf46cb5f9")

            //module.exports.getUsers("Danil123")
            //module.exports.setUser({ ip: "123/3232/23/23/", login: "Dani", name: "qwesdasd", password: "efe7082f25791b81c6f91e73e344ead33c6f9849de34c1e932f06ff14f9ce1a8" })
            /*  .then(res => {
                 console.log(res, "oooooooooookkkkkkkkkkkk");
             }).catch(err => {
                 console.log(err, "ERRRRRRRRRRRRRRRRRRRRRRRRRRORO");
             }) */
        })
    })
}
const isThereCollectionUser = () => {
    db.listCollections().toArray((error, collections) => {
        if (error) {
            console.log(`ERROR: ${err.message}`);
            throw err;
        }

        let collectionFlag = true;

        collections.forEach(collection => {
            if (collection.name === collectionNameUser) {
                collectionFlag = false;
            }
        })


        if (collectionFlag) {
            console.log('User collection not found');

            db.createCollection(collectionNameUser, userValidator, (err, res) => {
                if (err) {
                    console.log(`ERROR: ${err.message}`);
                    throw err;
                }

                console.log('User collection created ');
            })

            db.collection(collectionNameUser).createIndex({ login: 1 }, { unique: true })
        } else {
            console.log('User collection found')
        }
    });
}


module.exports.getUsers = (login) => {
    return db.collection(collectionNameUser).findOne({
        login: login
    })
}


module.exports.setUser = ({ ip, login, name, password, points = 0 }) => {
    return new Promise((resolve, reject) => {
        db.collection(collectionNameUser).insertOne({
            ip: ip,
            login: login,
            name: name,
            password: password,
            points: points,
            date: new Date(),
        }, (err, res) => {
            if (err) reject(err);

            resolve(res)
        })
    })
}

//-------------------------------------------

module.exports.getUser = (id) => {
    try {
        return db.collection(collectionNameUser).findOne({
            _id: ObjectId(id)
        }, {
            projection: {
                _id: 0,
                name: 1,
                points: 1
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
        db.collection(collectionNameUser).updateOne({ _id: ObjectId(id) }, { $set: { points: points } }, function (err, result) {
            if (err) reject(err);

            resolve(result)
        });
    })
}

//----------------------------------------


module.exports.dbClose = () => {
    client.close()
}