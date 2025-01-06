const createConnection = require('../db');

const countAllZips = async function () {
    const connection = await createConnection();
    const [rows] = await connection.query(`SELECT COUNT(*) AS total
                                           FROM zips`);
    return rows.length > 0 ? rows[0].total : 0;
};

const create = async function (name, fileName, zip) {
    const connection = await createConnection();
    const [result] = await connection.execute(`INSERT INTO zips (name, file_name, zip_file, user_id)
                                               VALUES (?, ?, ?, ?)`, [name, fileName, zip, 0]);

    return {name: name, id: result.insertId, fileName: fileName};
};

const getById = async (id) => {
    const connection = await createConnection();
    const [rows] = await connection.execute(`SELECT id, name, user_id, file_name, date_of_creation, date_of_modification
                                             FROM zips
                                             WHERE id = ?`, [id]);

    return rows.length > 0 ? rows[0] : null;
};

const deleteById = async (id) => {
    const connection = await createConnection();
    await connection.execute(`DELETE
                              FROM zips
                              WHERE id = ?`, [id]);
};

const getPaginatedByName = async (name, pageSize, offset) => {
    const connection = await createConnection();

    const [rows] = await connection.query(`SELECT id, name, description
                                           FROM zips
                                           WHERE name LIKE ?
                                           LIMIT ? OFFSET ?`, [`%${name}%`, pageSize, offset]);

    return rows;
};

const getAllByName = async (name) => {
    const connection = await createConnection();

    [rows] = await connection.query(`SELECT id, name
                                     FROM zips
                                     WHERE name LIKE ?`, [`%${name}%`]);

    return rows;
};

const getAllByUserId = async (id) => {
    const connection = await createConnection();

    const [rows] = await connection.query(`SELECT id, name
                                           FROM zips
                                           WHERE user_id = ?`, [id]);

    return rows;
};

const getAll = async () => {
    const connection = await createConnection();

    const [rows] = await connection.query(`SELECT name, user_id, date_of_creation, date_of_modification
                                           FROM zips`);
    return rows;
};

module.exports = {
    countAllZips,
    create,
    getById,
    deleteById,
    getPaginatedByName,
    getAllByName,
    getAllByUserId,
    getAll
};