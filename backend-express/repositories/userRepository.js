const createConnection = require('../db');

const countAllUsers = async function () {
    const connection = await createConnection();
    const [rows] = await connection.query(`SELECT COUNT(*) AS total
                                           FROM users`);
    return rows.length > 0 ? rows[0].total : 0;
};

const getAll = async function () {
    const connection = await createConnection();
    const [rows] = await connection.query(`SELECT id, nickname, email, date_of_creation, date_of_modification
                                           FROM users`)
    return rows;
};

const getById = async (id) => {
    const connection = await createConnection();
    const [rows] = await connection.query(`SELECT *
                                           FROM users
                                           WHERE id = ?`, [id]);
    return rows.length > 0 ? rows[0] : null;
};

const getByEmail = async (email) => {
    const connection = await createConnection();

    const [rows] = await connection.query(`SELECT *
                                           FROM users
                                           WHERE email = ?`, [email]);
    return rows.length > 0 ? rows[0] : null;
};

const deleteById = async (id) => {
    const connection = await createConnection();

    await connection.execute(`DELETE
                              FROM users
                              WHERE id = ?`, [id]);
};

const update = async (id, password, email, nickname) => {
    const connection = await createConnection();

    await connection.execute(`UPDATE users
                              SET nickname = ?,
                                  email    = ?,
                                  password = ?
                              WHERE id = ?`, [nickname, email, password, id]);
};

const create = async (email, password, nickname) => {
    const connection = await createConnection();

    const [res] = await connection.execute(`INSERT INTO users (email, password, nickname)
                                            VALUES (?, ?, ?)`, [email, password, nickname]);

    return {id: res.insertId, email: email, password: password, nickname: nickname};
};

module.exports = {
    countAllUsers,
    getById,
    getByEmail,
    deleteById,
    update,
    create,
    getAll
}