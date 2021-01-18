let crypto;

try {
    crypto = require('crypto');
} catch (err) {
    console.log('crypto support is disabled!');
}


const secret = 'sadsadsad';

const getHash = (password) => crypto
    .createHmac('sha256', secret)
    .update(password, 'utf-8')
    .digest('hex');


module.exports.getHash = getHash;

module.exports.comparison = (password, passwordBD) => getHash(password) === passwordBD;

