
module.exports = function(){

const mysql = require('mysql2');
const user = process.env.DB_USER;
const pwd = process.env.PASSWORD;
const db = process.env.DB_NAME;

let connection = mysql.createConnection({
    host: 'localhost',
    user: user,
    password: pwd,
    database: db,
});

connection.connect( err => {
    if (err) {
        console.log(`Mysql connection error ${err}`);
    } else {
        console.log('Connected to database');
    }
});

return connection;

}






