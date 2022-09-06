const mysql = require('mysql');

const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;

console.log(USER);


//local mysql db connetion
const cn = mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: "309013abraham",
    database: 'fundemic_new'
});

cn.connect( err => {
    if (err) throw err;
    console.log('Connected to database');
});


module.exports = cn;