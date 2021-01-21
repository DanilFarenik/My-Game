
module.exports.adminParameter = ({ reg = '', sortField = 'name', page = 0 }, fullPage) => {
    const answer = { err: '' };

    if (reg.trim().length > 15 || typeof reg !== "string") {
        answer.status = true;
        answer.err += "the sort field is invalid\n";
    }

    if (sortField !== "name" && sortField !== "points" && sortField !== "games" || typeof sortField !== "string") {
        answer.status = true;
        answer.err += "the sort field is invalid\n";
    }

    if (page < 0 || typeof page !== "number") {
        answer.status = true;
        answer.err += "incorrect page data\n";
    }

    if (answer.status) return answer;

    return {
        reg: reg,
        sortField: sortField,
        page: page > fullPage ? 0 : page,
        status: false
    }
}


module.exports.sanitize = function ({ name, login, password }, ip) {
    const data = {}

    if (ip) data.ip = ip;
    if (name) data.name = name;
    if (login) data.login = login;
    if (password) data.password = password;

    return data;
}


module.exports.validator = function ({ name, login, password }) {
    let err = { status: false };

    fieldValidator(name, "name", new RegExp(/^[A-Za-z][A-Za-z0-9_]{5,15}$/), err, "is not valid. A-z 0-9.Length 5-15 characters");

    fieldValidator(login, "login", new RegExp(/^[a-z0-9]{5,15}$/), err, "login must contain only small Latin letters and numbers.Length 5-15 characters");

    fieldValidator(password, "password", new RegExp(/^[a-zA-Z0-9]{8,15}$/), err, "password must be between 8 and 20 characters, A-z 0-9");

    if (!err.password) {
        let count = 0;

        count += /[a-z]/.test(password) ? 1 : 0;
        count += /[A-Z]/.test(password) ? 1 : 0;
        count += /\d/.test(password) ? 1 : 0;

        if (count > 2) {
            err.password = "password is not strong";
        }
    }


    return err;
}


function fieldValidator(field, fieldName, reg, err, message) {

    if (!field) {
        err[fieldName] = `${fieldName} is not defined.`;
        err.status = true;

    } else if (!reg.test(field)) {

        err[fieldName] = `${fieldName} ${message}`;
        err.status = true;
    }
}