const connection = require('../db');

const countAllUsers = async function () {
    return connection.query(`SELECT COUNT(*) AS total
                             FROM users`)[0].total;
};

module.exports = {
    countAllUsers,
}