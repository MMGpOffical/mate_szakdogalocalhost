const mysql = require('mysql2');
const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: "root",
    password: "",
    database: "projekt"
});

db.connect(err => {
    if (err) throw err;
    console.log("Connected to MySQL database");
});

module.exports = db;