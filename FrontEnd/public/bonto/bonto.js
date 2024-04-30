window.addEventListener("load", (event) => {
    getpost();
});





let logineduserID = "";
let loginedusername = "";
let loginedemail = "";
let admin = "";
fetch('/get-session-data')
    .then(response => response.json())
    .then(data => {
        if (data.user) {
            logineduserID = data.user.userid,
                loginedusername = data.user.username,
                loginedemail = data.user.email,
                admin = data.user.admin
        } else {
            logineduserID = undefined,
                loginedusername = undefined,
                loginedemail = undefined
            admin = 0;
        }
        setbtn();
        setbtnreg();
    });
function setbtnreg() {
    var buttonplace = document.getElementById('lxr');
    if (logineduserID != undefined) {
        buttonplace.innerHTML = `
            <p>Üdv úrja ${loginedusername}</p>
        `;
    } else {
        buttonplace.innerHTML = `
        <a href="/regisztracio">Regisztráció</a>
        <a href="/bejelentkezes">Bejelentkezés</a>
        `;
    }
}
function setbtn() {
    var buttonplace = document.getElementById('keresobuttonok');
    if (logineduserID != undefined) {
        buttonplace.innerHTML += `
            <button onclick="openModal()">Új hírdetés</button>
        `;
    } else {
    }
}


function openModal() {
    document.getElementById("modal").style.display = "block";
    document.getElementById("overlay").style.display = "block";
}

// Function to close the modal
function closeModal() {
    document.getElementById("modal").style.display = "none";
    document.getElementById("overlay").style.display = "none";
}



async function getpost() {
    const response = await fetch('/get-alkatresz-ad');
    const poszt = await response.json();
    console.table(poszt);
    let postHTML = "";
    try {
        for (let post of poszt) {
            if (admin == 1) {
                postHTML += `
                <div class="card">
                <div class="card-head" onclick="OpenAdInNewSite(${post.id})">
                    <img src="/images/${post.picpath}" alt="">
                </div>
                <div class="card-body" onclick="OpenAdInNewSite(${post.id})">
                    <div class="title">
                        <h3>${post.title}</h3>
                    </div>
                    <div class="descript">
                        <p>${post.year}M</p>
                        <p>${post.description}</p>
                    </div>
                </div>
                <div class="card-footer" onclick="OpenAdInNewSite(${post.id})">
                    <h3>${post.price}Ft</h3>
                    <h4>${post.varos}</h4>
                </div>
                <button id="postdelbtn${post.id}" data-posteduserid="${post.userid}" onclick="delbtn(${post.id})">Torles</button>
                </div>
                `;
            } else {
                postHTML += `
                <div class="card" onclick="OpenAdInNewSite(${post.id})">
                    <div class="card-head">
                        <img src="/images/${post.picpath}" alt="">
                    </div>
                    <div class="card-body">
                        <div class="title">
                            <h3>${post.title}</h3>
                        </div>
                        <div class="descript">
                            <p>${post.year}M</p>
                            <p>${post.description}</p>
                        </div>
                    </div>
                    <div class="card-footer">
                        <h3>${post.price}Ft</h3>
                        <h4>${post.varos}</h4>
                    </div>
                    </div>
            `;
            }
        }
    } catch (error) {
        console.log(error);
        document.getElementById('card-frame').innerHTML += "Még nincsenek hirdetések";
    }
    document.getElementById('card-frame').innerHTML += postHTML;
}


async function loadbrand() {
    var kivitelopt = document.getElementById('markaid');

    const response = await fetch('/getbrand');
    const poszt = await response.json();
    let postHTML = "";
    try {
        for (let post of poszt) {
            postHTML += `
        <option value="${post.id}">${post.marka}</option>
        `;
        }

    } catch (error) {
    }
    kivitelopt.innerHTML = postHTML;

}

loadbrand();

async function loadModelSelect() {
    var kivitelopt = document.getElementById('markaid');
    var modelselect = document.getElementById('modelid');

    const response = await fetch(`/getModelToBrand/${kivitelopt.value}`);
    const poszt = await response.json();
    let postHTML = "";
    try {
        for (let post of poszt) {
            postHTML += `
        <option value="${post.id}">${post.model}</option>
        `;
        }

    } catch (error) {
    }
    modelselect.innerHTML = postHTML;
};










document.getElementById('newcarform').addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(this);

    const imageFiles = formData.getAll('images'); // 'imageField' cseréld ki az input nevére
    for (const file of imageFiles) {
        if (!file.type.startsWith('image/')) {
            Swal.fire({
                icon: 'error',
                title: 'Hiba!',
                text: 'Csak képeket tölthetsz fel!!',
                background: '#557A46',
                color: '#fff',
            });
            return;
        }
    }
    if (imageFiles.length > 10) {
        Swal.fire({
            icon: 'error',
            title: 'Hiba!',
            text: 'Legfeljebb 10 képet tölthetsz csak fel!',
            background: '#557A46',
            color: '#fff',
        });
        return;
    }

    fetch(`/upload-alkatresz/${logineduserID}`, {
        method: 'POST',
        body: formData,
    })
        .then(response => {
            if (response.ok) {
                Swal.fire({
                    title: 'Siker',
                    text: 'A hirdetés sikeresen közzé lett téve!',
                    icon: 'success',
                    confirmButtonText: 'Bezárás',
                    confirmButtonColor:'#4CAF50',
                    background: '#557A46',
                    color: '#fff',
                    allowOutsideClick: false
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = '/bonto';
                    }
                });
            } else { 
                Swal.fire({
                    icon: 'error',
                    title: 'Hiba!',
                    text: 'Ismeretle hiba történt! Kérjük próbálja meg később!',
                    background: '#557A46',
                    color: '#fff',
                });
            }
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Hiba!',
                text: 'Ismeretle hiba történt! Kérjük próbálja meg később!',
                background: '#557A46',
                color: '#fff',
            });
        });
});







function delbtn(id) {
    delPost(id);
}


async function delPost(post) {
    let userid = document.getElementById("postdelbtn" + post).dataset.posteduserid;
    Swal.fire({
        title: "Biztos hogy törölni szeretnéd?",
        text: "Ezt a folyamatot nem lehet vissza vonni!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Igen, törlöm!",
        cancelButtonText: "Nem, nem törlöm!",
        reverseButtons: true,
        allowOutsideClick: false,
        background: '#557A46',
        color: '#fff',
    }).then(async (result) => {
        if (result.isConfirmed) {
            const response = await fetch(`/delbonto/${post}/${userid}`, {});
            if (response.status == 200) {
                Swal.fire({
                    title: "Siker!",
                    text: "A poszt sikeresen törölve lett!",
                    confirmButtonText: 'Bezárás',
                    icon: "success",
                    background: '#557A46',
                    allowOutsideClick: false,
                    color: '#fff',
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = '/bonto';
                    }
                });
            }
            if (response.status == 401) {
                Swal.fire({
                    icon: 'error',
                    title: 'Hiba!',
                    text: 'Ismeretle hiba történt! Kérjük próbálja meg később!',
                    background: '#557A46',
                    color: '#fff',
                });
            }
        }
    });
}

function OpenAdInNewSite(posztID) {
    window.location.href = `/alkatresz/${posztID}`;
}

function login() {
    window.location.href = '/bejelentkezes';
};