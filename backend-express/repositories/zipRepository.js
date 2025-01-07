const createConnection = require('../db');

const countAllZips = async function () {
    const connection = await createConnection();
    const [rows] = await connection.query(`SELECT COUNT(*) AS total
                                           FROM zips`);
    return rows.length > 0 ? rows[0].total : 0;
};

const create = async function (name, fileName, zip, userId, description) {
    const connection = await createConnection();
    const [result] = await connection.execute(`INSERT INTO zips (name, file_name, zip_file, user_id, description)
                                               VALUES (?, ?, ?, ?, ?)`, [name, fileName, zip, userId, description]);

    return {name: name, id: result.insertId, fileName: fileName};
};

const getById = async (id) => {
    const connection = await createConnection();
    const [rows] = await connection.execute(`SELECT id, name, description, zip_file, user_id, file_name, date_of_creation, date_of_modification
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

    const [rows] = await connection.query(`SELECT id, name, user_id, date_of_creation, date_of_modification
                                           FROM zips`);
    return rows;
};

const getAllByZipType = async (typeId) => {
    const connection = await createConnection();

    const [rows] = await connection.query(`SELECT id, name
                                           FROM zips
                                                    LEFT JOIN zip_types on zips.id = zip_types.zip_id
                                                    WHERE type_id = ?`, [typeId]);
    return rows;
};

const update = async (name, fileName, zip, description, id) => {
    const connection = await createConnection();

    await connection.execute(`UPDATE zips
                              SET name        = ?,
                                  file_name   = ?,
                                  zip_file    = ?,
                                  description = ?
                              WHERE id = ?`, [name, fileName, zip, description, id]);
};

module.exports = {
    countAllZips,
    create,
    getById,
    deleteById,
    getPaginatedByName,
    getAllByName,
    getAllByUserId,
    getAll,
    getAllByZipType,
    update
};