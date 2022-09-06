const mysql = require('mysql');

const user = process.env.DB_USER;
const pwd = process.env.PASSWORD;
const db = process.env.DB_NAME;

console.log(user);


//local mysql db connetion
const cn = mysql.createConnection({
    host: 'localhost',
    user: user,
    password: pwd,
    database: db,
});

cn.connect( err => {
    if (err) throw err;
    console.log('Connected to database');
});


module.exports = cn;