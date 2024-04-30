let logineduserID = "";
let loginedusername = "";
let loginedemail = "";
fetch('/get-session-data')
    .then(response => response.json())
    .then(data => {
    if (data.user) {
        logineduserID = data.user.userid,
        loginedusername = data.user.username,
        loginedemail = data.user.email,
        console.log(logineduserID);
    } else {
        logineduserID = undefined,
        loginedusername = undefined,
        loginedemail = undefined
    }
    setbtn();
});

function setbtn() {
    var buttonplace = document.getElementById('lxr');
    if (logineduserID != undefined) {
        buttonplace.innerHTML = `
            <p>Üdv újra <a href="/user">${loginedusername}</a></p>
        `;
    } else {
        buttonplace.innerHTML = `
        <a href="/regisztracio">Regisztráció</a>
        <a href="/bejelentkezes">Bejelentkezés</a>
        `;
    }
}
