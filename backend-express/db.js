const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'db',
    user: 'root',
    // password: 'password',
    password: '',
    database: 'zipManager'
});

connection.connect();

module.exports = connection;