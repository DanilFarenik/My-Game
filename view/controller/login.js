import connect from "../model/loginModel.js";

const formRegister = document.getElementById("formRegister");
const formLogin = document.getElementById("formLogin");
const btnLogin = document.getElementById("btnLogin");
const btnRegistre = document.getElementById("btnRegistre");

const errorListRegister = document.getElementById("errorListRegister");
const errorListLogin = document.getElementById("errorListLogin");

btnRegistre.addEventListener("click", () => {
    formLogin.classList.add("none");

    formRegister.classList.remove("none");
})

btnLogin.addEventListener("click", () => {
    formLogin.classList.remove("none");

    formRegister.classList.add("none");
})



formRegister.addEventListener("submit", (e) => {
    e.preventDefault()

    errorListRegister.innerHTML = "";

    if (e.target[2].value !== e.target[3].value) {
        createErrorList({ err: "Passwords do not match" }, errorListRegister);

        return;
    }

    const data = {
        login: e.target[0].value,
        name: e.target[1].value,
        password: e.target[2].value,
    }

    connect(data, 'http://localhost:3097/register')
        .then(res => {
            if (res.status === 300) {
                window.location.replace(res.json().url);
            } else {
                return res.json();
            }
        }).then(res => {
            if (res.status) {
                delete res.status;

                createErrorList(res, errorListRegister);

                e.target[2].value = "";
                e.target[3].value = "";
            } else {
                window.location.replace(res.url);
            }
        })
})

formLogin.addEventListener("submit", (e) => {
    e.preventDefault();

    errorListLogin.innerHTML = "";

    const data = {
        login: e.target[0].value,
        password: e.target[1].value,
    }

    connect(data, 'http://localhost:3097/login')
        .then(res => {
            if (res.status === 300) {
                res.json();

                window.location.replace(res.url);
            } else {
                return res.json()
            }
        })
        .then(res => {
            createErrorList(res, errorListLogin);

            e.target[1].value = "";
        })
})


function createErrorList(err, errorList) {
    for (let item in err) {
        let li = document.createElement("li");

        li.innerHTML = err[item];

        errorList.append(li)
    }
}
