let logineduserID = "";
let loginedusername = "";
let loginedemail = "";
let phone = "";
let szerepkor = "Felhasználó";
fetch('/get-session-data')
    .then(response => response.json())
    .then(data => {
    console.table(data);
        if (data.user) {
            logineduserID = data.user.userid;
            loginedusername = data.user.username;
            loginedemail = data.user.email;
            if (data.user.phone == undefined) {
                phone = "Nincs megadva"
            } else {
                phone = data.user.phone;
            }
            if (data.user.admin === 1) {
                szerepkor = "Admin";
            }
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
            <p>Üdv újra ${loginedusername}</p>
        `;
        document.getElementById('useremail').textContent = `Email: ${loginedemail}`;
        document.getElementById('username').textContent = `Felhasználónév: ${loginedusername}`;
        document.getElementById('szerepkor').textContent = `Szerepkör: ${szerepkor}`;
        document.getElementById('phone').textContent = `Telefonszam: ${phone}`;
    } else {
        buttonplace.innerHTML = `
        <a href="/regisztracio">Regisztráció</a>
        <a href="/bejelentkezes">Bejelentkezés</a>
        `;
    }
}


document.querySelector('#telfrissites').addEventListener('submit', (e) => {
    e.preventDefault();
    let phonenumber = document.querySelector('#phoneid').value;
    console.log(phonenumber);

    const loginData = {
        phonenumber: phonenumber,
        userid: logineduserID,
    };

    sendData(loginData);
});

async function sendData(newData) {
    const response = await fetch('/updatephone', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
    });

    if (response.ok) {
        Swal.fire({
            icon: 'error',
            title: 'siker!',
            text: 'Hibás felhasználónevet vagy jelszót adtál meg!',
            background: '#3A0061',
            color: '#fff',
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Hiba!',
            text: 'Hibás felhasználónevet vagy jelszót adtál meg!',
            background: '#3A0061',
            color: '#fff',
        });
    }
}