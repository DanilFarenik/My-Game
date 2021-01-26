import adminData, { changeOfStatus } from '../model/adminModel.js';
import rendering from '../view/userTable.js';


const sort = document.getElementById("sort");
const sortName = document.getElementById("sortName");

const next = document.getElementById("next");
const previous = document.getElementById("previous");
const currentPage = document.getElementById("currentPage");

const table = document.getElementById("table");


let answer = {}
const options = {}


getUser(options);

function getUser(options) {
    adminData(options).then(res => {
        if (!res.status) {

            currentPage.value = res.page + 1;

            rendering(res.users);

            answer = res;

            if (res.users.length < 10 && answer.page === 0) {
                next.disabled = true;
                previous.disabled = true;
            } else {
                next.disabled = false;
                previous.disabled = false;
            }

            if (res.users.length === 0 && answer.page != 0) {
                options.page = 0;

                getUser(options)
            }
        }
    })
}


function replaceRole(password, id, role) {
    changeOfStatus(
        password,
        id,
        role === 'admin' ? false : true
    ).then(res => {
        if (res.url) {

            window.location.replace(res.url);

        } else if (res.error) {

            alert(res.error)

        } else {

            getUser(options)

        }
    })
}


table.addEventListener('click', (e) => {
    if (e.target.localName === 'button') {
        const password = prompt("enter password");


        if (password) {
            replaceRole(password, e.target.getAttribute('data-id'), e.target.getAttribute('data-role'))
        }
    }
})

sort.addEventListener('click', () => {
    options.reg = sortName.value;

    options.sortField = methodSort.value;

    getUser(options);
})

next.addEventListener("click", () => {
    if ((answer.page + 1) === answer.totalPages) {

        options.page = 0;

    } else {

        options.page = 1 + answer.page;
    }

    getUser(options);
})

previous.addEventListener("click", () => {

    if (answer.page === 0) {

        options.page = answer.totalPages - 1;

    } else {

        options.page = answer.page - 1;
    }

    getUser(options);
})