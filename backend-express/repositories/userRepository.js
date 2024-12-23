const createConnection = require('../db');

const countAllUsers = async function () {
    const connection = await createConnection();
    const [rows] = await connection.query(`SELECT COUNT(*) AS total
                                           FROM users`);
    return rows.length > 0 ? rows[0].total : 0;
};

const getById = async (id) => {
    const connection = await createConnection();
    const [rows] = await connection.query(`SELECT *
                                           FROM users
                                           WHERE id = ?`, [id]);
    return rows.length > 0 ? rows[0] : null;
};

module.exports = {
    countAllUsers,
    getById
}