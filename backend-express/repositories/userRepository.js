const createConnection = require('../db');

const countAllUsers = async function () {
    const connection = await createConnection();
    const [rows] = await connection.query(`SELECT COUNT(*) AS total
                                           FROM users`);
    return rows.length > 0 ? rows[0].total : 0;
};

const getAll = async function () {
    const connection = await createConnection();
    const [rows] = await connection.query(`
        SELECT u.id,
               u.nickname,
               u.email,
               u.date_of_creation,
               u.date_of_modification,
               IF(MAX(r.name = 'admin'), 'Yes', 'No') AS is_admin
        FROM users u
                 LEFT JOIN users_roles ur ON u.id = ur.user_id
                 LEFT JOIN roles r ON ur.role_id = r.id
        GROUP BY u.id, u.nickname, u.email, u.date_of_creation, u.date_of_modification
    `);
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

const update = async (ogEmail, email, nickname) => {
    const connection = await createConnection();

    await connection.execute(`UPDATE users
                              SET nickname = ?,
                                  email    = ?
                              WHERE email = ?`, [nickname, email, ogEmail]);
};

const changePassword = async (email, password) => {
    const connection = await createConnection();

    await connection.execute(`UPDATE users
                              SET password = ?
                              WHERE email = ?`, [password, email]);
};

const create = async (email, password, nickname) => {
    const connection = await createConnection();

    const [res] = await connection.execute(`INSERT INTO users (email, password, nickname)
                                            VALUES (?, ?, ?)`, [email, password, nickname]);

    return {id: res.insertId, email: email, password: password, nickname: nickname};
};

const getAllPaginated = async (pageSize, offset) => {
    const connection = await createConnection();

    const [rows] = await connection.query(`SELECT *
                                           FROM users
                                           LIMIT ? OFFSET ?`, [pageSize, offset]);

    return rows;
};

module.exports = {
    countAllUsers,
    getById,
    getByEmail,
    deleteById,
    update,
    create,
    getAll,
    changePassword,
    getAllPaginated
}