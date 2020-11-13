import Error from "../view/errorList.js";

const err = new Error();

export default function (name) {
    if (!/^[a-zA-Z][a-zA-Z0-9-_\.]{3,20}/.test(name)) {
        err.addError("Name is not valid");
        return false;
    }
    err.closeError();
    return true;
}