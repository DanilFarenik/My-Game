import adminData from '../model/adminModel.js';
import rendering from '../view/userTable.js';


const sort = document.getElementById("sort");
const sortName = document.getElementById("sortName");

const next = document.getElementById("next");
const previous = document.getElementById("previous");
const currentPage = document.getElementById("currentPage");


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