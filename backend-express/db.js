const mysql = require('mysql2/promise');

let connection = null;

async function createConnection() {
    if (!connection)
        connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'password',
            database: 'zipManager'
        });

    return connection;
}

module.exports = createConnection;