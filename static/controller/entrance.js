import logout from '../model/logout.js';

let logoutBtn = document.getElementById("logout");

logoutBtn.addEventListener("click", () => {
    logout()
})