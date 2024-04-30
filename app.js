const fs = require('fs');
const fs2 = require('fs').promises;
const path = require('path');
const express = require('express');
const session = require('express-session');
const multer = require('multer');
let ejs = require('ejs');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const app = express();
const saltRounds = 10;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static('./FrontEnd/upload'));
app.use('/slider', express.static('./FrontEnd/src/image'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './FrontEnd/views/res'));

const db = require('./routes/db');


//sessio beallitas
app.use(session({
    secret: 'mySecretKey',
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // secure: true csak HTTPS alatt működik
}));



app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static('./FrontEnd/upload'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './FrontEnd/views/res'));


// feltolteshez beallitas. mentesi hely
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './FrontEnd/upload/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });




//Kijelentkezes
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.redirect('/');
        }
        res.status = 200;
        res.redirect('/');
    });
});




app.get('/', (req, res) => {
    fs.readFile('./FrontEnd/views/home/home.html', (err, file) => {
        res.setHeader('content-type', 'text/html');
        res.end(file);
    });
})
app.get('/home.css', (req, res) => {
    fs.readFile('./FrontEnd/public/home/home.css', (err, file) => {
        res.end(file);
    });
})
app.get('/home.js', (req, res) => {
    fs.readFile('./FrontEnd/public/home/home.js', (err, file) => {
        res.end(file);
    });
})

app.get('/hasznaltauto', (req, res) => {
    fs.readFile('./FrontEnd/views/hasznaltauto/hasznaltaut.html', (err, file) => {
        res.setHeader('content-type', 'text/html');
        res.end(file);
    });
})
app.get('/hasznalt.css', (req, res) => {
    fs.readFile('./FrontEnd/public/hasznaltauto/hasznalt.css', (err, file) => {
        res.end(file);
    });
})



app.get('/bonto', (req, res) => {
    fs.readFile('./FrontEnd/views/bonto/bonto.html', (err, file) => {
        res.setHeader('content-type', 'text/html');
        res.end(file);
    });
})
app.get('/bonto.css', (req, res) => {
    fs.readFile('./FrontEnd/public/bonto/bonto.css', (err, file) => {
        res.end(file);
    });
})
app.get('/bonto.js', (req, res) => {
    fs.readFile('./FrontEnd/public/bonto/bonto.js', (err, file) => {
        res.end(file);
    });
})




app.get('/bejelentkezes', (req, res) => {
    fs.readFile('./FrontEnd/views/registerxlogin/login.html', (err, file) => {
        res.setHeader('content-type', 'text/html');
        res.end(file);
    });
})
app.get('/regiszterxlogin.css', (req, res) => {
    fs.readFile('./FrontEnd/public/registerxlogin/regiszterxlogin.css', (err, file) => {
        res.end(file);
    });
})
app.get('/regxlogin.js', (req, res) => {
    fs.readFile('./FrontEnd/public/registerxlogin/regxlogin.js', (err, file) => {
        res.end(file);
    });
})
app.get('/hasznalt.js', (req, res) => {
    fs.readFile('./FrontEnd/public/hasznaltauto/hasznalt.js', (err, file) => {
        res.end(file);
    });
})
app.get('/regisztracio', (req, res) => {
    fs.readFile('./FrontEnd/views/registerxlogin/register.html', (err, file) => {
        res.setHeader('content-type', 'text/html');
        res.end(file);
    });
})
//user

app.get('/user', (req, res) => {
    fs.readFile('./FrontEnd/views/user/user.html', (err, file) => {
        res.setHeader('content-type', 'text/html');
        res.end(file);
    });
})
app.get('/user.css', (req, res) => {
    fs.readFile('./FrontEnd/public/user/user.css', (err, file) => {
        res.end(file);
    });
})
app.get('/user.js', (req, res) => {
    fs.readFile('./FrontEnd/public/user/user.js', (err, file) => {
        res.end(file);
    });
})


//részletes


app.get('/hasznaltautoreszletes', (req, res) => {
    fs.readFile('./FrontEnd/views/hasznalauto/hasznalautoreszletes/hasznaltautoreszletes.html', (err, file) => {
        res.setHeader('content-type', 'text/html');
        res.end(file);
    });
})
app.get('/bontoreszletes', (req, res) => {
    fs.readFile('./FrontEnd/views/bonto/bontoreszletes/bontoreszletes.html', (err, file) => {
        res.setHeader('content-type', 'text/html');
        res.end(file);
    });
})
app.get('/reszletes.css', (req, res) => {
    fs.readFile('./FrontEnd/public/bonto/reszletes/reszletes.css', (err, file) => {
        res.end(file);
    });
})
app.get('/reszletes.js', (req, res) => {
    fs.readFile('./FrontEnd/public/bonto/reszletes/reszletes.js', (err, file) => {
        res.end(file);
    });
})



// session adat lekeres hogy ellenorizve legyen hog a user be van e loginolva
app.get('/get-session-data', (req, res) => {
    if (req.session && req.session.user) {
        res.json({ "user": req.session.user });
    } else {
        res.json({ user: null });
    }
});



app.post('/register', (req, res) => {
    const { regusername, regemail, regpassword } = req.body;
    var hashpassword = "";
    bcrypt.hash(regpassword, saltRounds, function (err, hash) {
        if (err) { console.log(err) }
        else { hashpassword = hash }
        //console.log(hash)
        //console.log(hashpassword)
        const querysafe = `SELECT username, email FROM user WHERE username = ? OR email = ?`;
        db.query(querysafe, [regusername, regemail], (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).send({ message: "Szerver hiba!" });
                return;
            }
            if (results.length >= 1) {
                res.status(401).send({ message: "Foglalt felhasználónév vagy email!" });
                return;
            }
            else {
                const query = `INSERT INTO user (userid, username, email, password, admin) VALUES (NULL, ?, ?, ?, 0);`;
                db.query(query, [regusername, regemail, hashpassword], (err, results) => {
                    //console.log(regusername, regemail, hashpassword);
                    if (err) {
                        console.error(err);
                        res.status(500).send({ message: "Szerver hiba!" });
                        return;
                    }
                    if (results.length === 0) {
                        res.status(401).send({ message: "Hibás felhasználónév vagy jelszó!" });
                        return;
                    }
                    res.redirect('/');
                });
            };
        });
    });
});



//bejelentkezés
app.post('/login', (req, res) => {
    const { loginusername, loginpassword } = req.body;

    //console.log(loginpassword, loginusername);
    //console.log(rememberme);
    //console.log(rememberme + "emlekezzram");


    const query = `SELECT * FROM user WHERE (username = ? OR email = ?)`;
    db.query(query, [loginusername, loginusername], (err, results) => {
        if (err) {
            //console.error(err);
            res.status(500).send({ message: "Szerver hiba!" });
            return;
        }
        if (results.length == 0) {
            //console.error(err);
            res.status(401).send({ message: "Hibás felhasználónév vagy jelszó4" });
            return;
        }
        bcrypt.compare(loginpassword, results[0].password, function (err, result) {
            if (err) {
                console.error(err);
                res.status(500).send({ message: "Szerver hiba!" });
                return;
            }
            if (result) {
                req.session.user = {
                    userid: results[0].userid,
                    username: results[0].username,
                    email: results[0].email,
                    admin: results[0].admin,
                    phone: results[0].phonenumber,
                };

                res.status(200).send({ message: "Sikeres auth" });
            } else {
                res.status(401).send({ message: "Hibás felhasználónév vagy jelszó!" });
            }
        });
    });
});




app.get('/getkivitel', (req, res) => {
    db.query(`SELECT * FROM kivitel;`, function (err, results) {
        if (err) return err;
        //console.log(results);
        res.send(results);
    });
});

app.get('/getbrand', (req, res) => {
    db.query(`SELECT * FROM marka ORDER BY marka ASC;`, function (err, results) {
        if (err) return err;
        //console.log(results);
        res.send(results);
    });
});
app.get('/getModelToBrand/:brandid', (req, res) => {
    var brandid = req.params.brandid;
    db.query(`SELECT * FROM model WHERE model.markaid = ? ORDER by model.model ASC`,[brandid] ,function (err, results) {
        if (err) {
            console.log(err);
            return err};
        //console.log(results);
        res.send(results);
    });
});



// feltolti a hasznaltautohoz a hirdetest
app.post('/upload/:id', upload.array('images'), (req, res, next) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).send('Nincs fájl feltöltve');
    }
    let images = req.files;
    let id = req.params.id;
    const { title, description, gastype, year, markaid,modelid,type,price,kmoraallas,kivitelid,kobcenti,kw,varos} = req.body;
    var loero = kw*1.34102209;
    const query = `INSERT INTO hasznaltauto (id, userid, title, description, markaid, modelid, type, gastype, price, year, kmoraallas, kivitelid, hengerurtartalom,kw,loero,varos) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?);`;
    db.query(query, [id, title, description, markaid, modelid,type, gastype, price, year, kmoraallas, kivitelid,kobcenti,kw,loero,varos], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send();
            return;
        }
        if (results.length === 0) {
            res.status(401).send();
            return;
        }
        images.forEach(image => {
            const query2 = `INSERT INTO hasznaltautopics (id, hasznalautoid, picpath) VALUES (NULL, ?, ?);`;
            db.query(query2, [results.insertId, image.filename], (err, results) => {
                if (err) {
                    console.error(err);
                    res.status(500).send();
                    return;
                }
                if (results.length === 0) {
                    res.status(401).send();
                    return;
                }
                res.status(200).send()
            });
        });
    });

    res.status(200);
    res.redirect('/hasznaltauto');
});






app.get("/post/:postID", (req, res, next) => {
    const postId = req.params.postID;
    //console.log(postId);

    db.query(
        "SELECT hasznaltauto.*,marka.marka, model.model,kivitel.kivitel, user.userid, user.username, user.email, user.phonenumber FROM hasznaltauto LEFT JOIN user ON hasznaltauto.userid = user.userid LEFT JOIN marka ON hasznaltauto.markaid = marka.id LEFT JOIN model ON hasznaltauto.modelid = model.id LEFT JOIN kivitel ON hasznaltauto.kivitelid = kivitel.id WHERE hasznaltauto.id = ?;",
        [postId],
        function (err, results) {
            if (err) {
              //console.log("asd");
                return callback(err);
            } else {
              //console.log(results[0]);
                try {
                    console.table(results[0]);
                    return res.render("markpost", { post: results[0] });
                } catch (error) {
                    res.redirect("/404");
                }
            }
        }
    );
});



app.get("/get-pic-to-reszletes/:postID", (req, res) => {
    const postId = req.params.postID;
    const query = "SELECT picpath FROM hasznaltautopics WHERE hasznaltautopics.hasznalautoid = ?";
    db.query(query, [postId] , function(err, results) {
        if (err) {
            console.log(err);
            return err;
        } else {
            //console.log(results[0]);
            console.table(results);
            res.send(results);
            
        }
    })
})







app.get('/get-market-ad', upload.array('images'), (req, res, next) => {
    const query = `
        SELECT hasznaltauto.*,
        marka.marka,
        model.model,
        IFNULL(hasznaltautopics.picpath, 'No Image') AS picpath
        FROM hasznaltauto
        LEFT JOIN marka ON hasznaltauto.markaid = marka.id
        LEFT JOIN model on hasznaltauto.modelid = model.id
        LEFT JOIN (
            SELECT MIN(picpath) AS picpath, hasznalautoid
            FROM hasznaltautopics
            GROUP BY hasznalautoid
        ) hasznaltautopics ON hasznaltauto.id = hasznaltautopics.hasznalautoid
        ORDER BY hasznaltauto.id DESC;
    `;
    db.query(query, (err, results) => {
        if (err) {
            //console.error(err);
            res.status(500).send({ message: "Szerver hiba!" });
            return;
        }
        if (results.length === 0) {
            res.status(200).send({ message: "Hibás felhasználónév vagy jelszó!" });
            return;
        }
        if (results.length > 0) {
            res.setHeader('content-type', 'application/json');
            //console.table(results);
            res.json(results);
        }
        else {
            res.status(401).send();
        }
    });
});




function getPostById(postId, callback) {
    db.query(`
    SELECT market.marketID, market.userID, user.userID, user.username, market.title, user.userID, market.marketpost, market.price, market.marketDATE 
    FROM market 
    LEFT JOIN user ON market.userID = user.userID WHERE market.marketID = ?;`,
        [postId], function (err, results) {
            if (err) return callback(err);
            callback(null, results[0]);
        });
}


app.get('/marketpost/:postID', (req, res, next) => {
    const postId = req.params.postID;
    getPostById(postId, (err, post) => {
        if (err) return next(err);
        if (!post) return res.redirect('/404');
        
        res.render('markpost', { 
            post: post,
        });
    });
});

app.get('/getpic/:postID', (req, res, next) => {
    const postId = req.params.postID;
    db.query(`SELECT * FROM marketpicture WHERE marketpicture.marketID = ?;`, [postId], function (err, results) {
        if (err) return err;
        //console.log(results);
        res.send(results);
    });
});








app.post('/updatemarketpost', (req, res, next) => {
    const { userPosztID, editposztID, newtitle, newpost, editprice} = req.body;

    if (req.session.user.userID == userPosztID || req.session.user.admin == 1) {
        const query = `UPDATE market SET title = ?, marketpost = ?, price = ? WHERE market.marketID = ?;`;
        db.query(query, [newtitle, newpost, editprice, editposztID], (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).send();
                return;
            }
            if (results.length === 0) {
                res.status(401).send();
                return;
            }
            res.status(200).send()
        });
    }
    else {
        res.status(401).send();
    }
});


async function deleteFile(filePath) {
    try {
        await fs2.unlink(`FrontEnd/upload/${filePath}`);
        console.log(`File ${filePath} has been deleted.`);
    } catch (err) {
        console.error(err);
    }
}




app.get('/delmarket/:poszt/:posztolo', (req, res, next) => {
    const poszt = req.params.poszt;
    const posztolo = req.params.posztolo;

    if (req.session.user.userID == posztolo || req.session.user.admin == 1) {
        //Képek törlése
        const delpicquery = 'SELECT picpath FROM hasznaltautopics WHERE hasznalautoid = ?';
        db.query(delpicquery, [poszt], (err, ress) => {
            if (err) {
                console.log(err);
            }
            if (ress.length != 0) {
                ress.forEach(kepek => {
                    deleteFile(kepek.picpath)
                    console.log(kepek.picpath);
                });
            }
        })

        //hirdetés törlése
        const query = `DELETE FROM hasznaltauto WHERE hasznaltauto.id = ?;`;
        db.query(query, [poszt], (err, results) => {
            console.log(results);
            if (err) {
                console.error(err);
                res.status(500).send();
                return;
            }
            if (results.length === 0) {
                res.status(401).send();
                return;
            }
            res.status(200).send();
        });
    }
    else {
        res.status(401).send();
    }
});






app.get('/get-alkatresz-ad', upload.array('images'), (req, res, next) => {
    const query = `
    SELECT hasznaltalkatresz.*, IFNULL(hasznaltalkatreszpics.picpath, 'No Image') AS picpath
    FROM hasznaltalkatresz
    LEFT JOIN (
        SELECT MIN(picpath) AS picpath, hasznaltalkatreszid
        FROM hasznaltalkatreszpics
        GROUP BY hasznaltalkatreszid
    ) hasznaltalkatreszpics ON hasznaltalkatresz.id = hasznaltalkatreszpics.hasznaltalkatreszid
    ORDER BY hasznaltalkatresz.id DESC;
    `;
    db.query(query, (err, results) => {
        if (err) {
            //console.error(err);
            res.status(500).send({ message: "Szerver hiba!" });
            return;
        }
        if (results.length === 0) {
            res.status(200).send({ message: "Nincs adat" });
            return;
        }
        if (results.length > 0) {
            res.setHeader('content-type', 'application/json');
            console.table(results);
            res.json(results);
        }
        else {
            res.status(401).send();
        }
    });
});


app.post('/upload-alkatresz/:id', upload.array('images'), (req, res, next) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).send('Nincs fájl feltöltve');
    }
    let images = req.files;
    let id = req.params.id;
    const { title, description, year, markaid,modelid,price,varos} = req.body;

    const query = `INSERT INTO hasznaltalkatresz (id, userid, title, description, markaid, modelid, price, year,varos) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?);`;
    db.query(query, [id, title, description, markaid, modelid, price, year, varos], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send();
            return;
        }
        if (results.length === 0) {
            res.status(401).send();
            return;
        }
        images.forEach(image => {
            const query2 = `INSERT INTO hasznaltalkatreszpics (id, hasznaltalkatreszid , picpath) VALUES (NULL, ?, ?);`;
            db.query(query2, [results.insertId, image.filename], (err, results) => {
                if (err) {
                    console.error(err);
                    res.status(500).send();
                    return;
                }
                if (results.length === 0) {
                    res.status(401).send();
                    return;
                }
                res.status(200).send()
            });
        });
    });

    res.status(200);
    res.redirect('/bonto');
});


app.get('/delbonto/:poszt/:posztolo', (req, res, next) => {
    const poszt = req.params.poszt;
    const posztolo = req.params.posztolo;

    if (req.session.user.userID == posztolo || req.session.user.admin == 1) {
        //Képek törlése
        const delpicquery = 'SELECT picpath FROM hasznaltalkatreszpics WHERE hasznaltalkatreszid = ?';
        db.query(delpicquery, [poszt], (err, ress) => {
            if (err) {
                console.log(err);
            }
            if (ress.length != 0) {
                ress.forEach(kepek => {
                    deleteFile(kepek.picpath)
                    console.log(kepek.picpath);
                });
            }
        })

        //hirdetés törlése
        const query = `DELETE FROM hasznaltalkatresz WHERE id = ?;`;
        db.query(query, [poszt], (err, results) => {
            console.log(results);
            if (err) {
                console.error(err);
                res.status(500).send();
                return;
            }
            if (results.length === 0) {
                res.status(401).send();
                return;
            }
            res.status(200).send();
        });
    }
    else {
        res.status(401).send();
    }
});

//Alkatresz reszletes nezet
app.get("/alkatresz/:postID", (req, res, next) => {
    const postId = req.params.postID;
    //console.log(postId);

    db.query(
        `
        SELECT hasznaltalkatresz.*,marka.marka, model.model, user.userid, user.username, user.email, user.phonenumber 
        FROM hasznaltalkatresz 
        LEFT JOIN user ON hasznaltalkatresz.userid = user.userid 
        LEFT JOIN marka ON hasznaltalkatresz.markaid = marka.id 
        LEFT JOIN model ON hasznaltalkatresz.modelid = model.id
        WHERE hasznaltalkatresz.id = ?;
        `,
        [postId],
        function (err, results) {
            if (err) {
              //console.log("asd");
                return callback(err);
            } else {
              //console.log(results[0]);
                try {
                    console.table(results[0]);
                    return res.render("markpost", { post: results[0] });
                } catch (error) {
                    res.redirect("/404");
                }
            }
        }
    );
});



app.get('/GetPicToAlkatresz/:postID', (req, res, next) => {
    const postId = req.params.postID;
    db.query(`SELECT * FROM hasznaltalkatreszpics WHERE hasznaltalkatreszpics.hasznaltalkatreszid = ?;`, [postId], function (err, results) {
        if (err) return err;
        console.log(results);
        res.send(results);
    });
});
app.post('/updatephone', (req, res, next) => {
    const { phonenumber,userid } = req.body;

    console.log(phonenumber, userid);

    const query = `UPDATE user SET phonenumber = ? WHERE user.userid = ?;`
    db.query(query, [phonenumber, userid], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send();
            return;
        }
        if (results.length === 0) {
            res.status(401).send();
            return;
        }
        res.status(200).send()
    });
});







app.get('/searchinhasznaltauto', (req, res) => {
    const {
        minprice,
        maxprice,
        marka,
        modell,
        minyear,
        maxyear,
        uzemanyag,
        minteljesitmeny,
        maxteljesitmeny,
        minhengerurtartalom,
        maxhengerurtartalom,
        kivitel
    } = req.query;
    const query = `
        SELECT hasznaltauto.*,
        marka.marka,
        model.model,
        IFNULL(hasznaltautopics.picpath, 'No Image') AS picpath
        FROM hasznaltauto
        LEFT JOIN marka ON hasznaltauto.markaid = marka.id
        LEFT JOIN model on hasznaltauto.modelid = model.id
        LEFT JOIN (
            SELECT MIN(picpath) AS picpath, hasznalautoid
            FROM hasznaltautopics
            GROUP BY hasznalautoid
        ) hasznaltautopics ON hasznaltauto.id = hasznaltautopics.hasznalautoid
        WHERE 
            (price >= ? OR ? IS NULL OR ? = '')
            AND (price <= ? OR ? IS NULL OR ? = '')
            AND (hasznaltauto.markaid = ? OR ? = NULL OR ? = '') 
            AND (hasznaltauto.modelid = ? OR ? = NULL OR ? = '') 
            AND (hasznaltauto.year >= ? OR ? IS NULL OR ? = '') 
            AND (hasznaltauto.year <= ? OR ? IS NULL OR ? = '')
            AND (hasznaltauto.gastype = ? OR ? IS NULL OR ? = '')
            AND (hasznaltauto.kw >= ? OR ? IS NULL OR ? = '') 
            AND (hasznaltauto.kw <= ? OR ? IS NULL OR ? = '')
            AND (hasznaltauto.kivitelid = ? OR ? IS NULL OR ? = '')
            AND (hasznaltauto.hengerurtartalom >= ? OR ? IS NULL OR ? = '') 
            AND (hasznaltauto.hengerurtartalom <= ? OR ? IS NULL OR ? = '')
        ORDER BY hasznaltauto.id DESC;
    `;

    db.query(query, [
        minprice, minprice, minprice,
        maxprice, maxprice, maxprice,
        marka, marka,marka,
        modell, modell, modell,
        minyear, minyear, minyear,
        maxyear, maxyear, maxyear,
        uzemanyag, uzemanyag, uzemanyag,
        minteljesitmeny, minteljesitmeny, minteljesitmeny,
        maxteljesitmeny, maxteljesitmeny, maxteljesitmeny,
        kivitel, kivitel, kivitel,
        minhengerurtartalom, minhengerurtartalom, minhengerurtartalom,
        maxhengerurtartalom, maxhengerurtartalom, maxhengerurtartalom
    ], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send();
            return;
        }
        if (results.length === 0) {
            res.redirect('/hasznaltauto');
            return;
        }
        res.render("results", { results: results });
    });
});





const port = 3000;
app.listen(port, () => {
    console.log(`A szerver fut a http://localhost:${port}`);
});