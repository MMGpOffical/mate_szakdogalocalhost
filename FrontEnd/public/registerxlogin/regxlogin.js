
try {
    document.querySelector('#regform').addEventListener('submit', (e) => {
        e.preventDefault();
        let username = document.querySelector('#regusername').value;
        let email = document.querySelector('#regemail').value;
        let pass = document.querySelector('#regpassword').value;

        if (username == "" || email == "" || pass == "") {
            Swal.fire({
                icon: 'error',
                title: 'Hiba!',
                text: 'Minden mezőt ki kell tölteni!'
            });
        } else if (document.querySelector('#regpassword').value === document.querySelector('#regpasswordagain').value) {
            const registerData = {
                regusername: username,
                regemail: email,
                regpassword: pass
            };
            sendregData(registerData);
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Hiba!',
                text: 'A jelszavak nem egyeznek!'
            })
        }
    });


    async function sendregData(newData) {
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newData),
        });

        if (response.status == 401) {
            Swal.fire({
                icon: 'error',
                title: 'Hiba!',
                text: 'Ez az email vagy felhasználónév már foglalt!'
            });
        }
        if (response.ok) {
            Swal.fire({
                title: 'Siker!',
                text: 'Sikeres regisztráció!',
                icon: 'success',
                confirmButtonText: 'Bezárás',
                background: '#557A46',
                color: '#fff',
                confirmButtonColor:'#4CAF50',
                allowOutsideClick: false
            }).then((result) => {
                // A felhasználó bezárta a modalt
                if (result.isConfirmed) {
                    window.location.href = '/';
                }
            });
        }
    }}
catch {

    //login

    document.querySelector('#loginform').addEventListener('submit', (e) => {
        e.preventDefault();
        let logusrname = document.querySelector('#loginusername').value;
        let logpass = document.querySelector('#loginpassword').value;

        const loginData = {
            loginusername: logusrname,
            loginpassword: logpass
        };

        sendData(loginData);
    });

    async function sendData(newData) {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newData),
        });

        if (response.ok) {
            window.location.href = document.referrer;
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
}