const createConnection = require("../db");
const {token} = require("morgan");

const getById = async (id) => {
    const connection = await createConnection();
    const [rows] = await connection.query(`SELECT *
                                           FROM user_tokens
                                           WHERE user_id = ?`, [id]);
    return rows.length > 0 ? rows[0] : null;
};

const save = async (id, token) => {
    const connection = await createConnection();
    const [res] = await connection.execute(`INSERT INTO user_tokens (user_id, token)
                                            VALUES (?, ?)`, [id, token]);
    return {user_id: id, token};
};

const update = async (id, token) => {
    const connection = await createConnection();
    await connection.query(`UPDATE user_tokens
                            SET token = ?
                            WHERE user_id = ? `, [token, id]);
};

const deleteByToken = async (token) => {
    const connection = await createConnection();

    await connection.execute(`DELETE
                              FROM user_tokens
                              WHERE token = ?`, [token]);
};

const getByToken = async (token) => {
    const connection = await createConnection();

    const [rows] = await connection.query(`SELECT *
                                           FROM user_tokens
                                           WHERE token = ?`, [token]);

    return rows.length > 0 ? rows[0] : null;
};

const deleteTokenById = async (userId) => {
    const connection = await createConnection();
    await connection.execute(`DELETE
                              FROM user_tokens
                              WHERE user_id = ?`, [userId]);
};

module.exports = {
    getById,
    save,
    update,
    deleteByToken,
    getByToken,
    deleteTokenById
}