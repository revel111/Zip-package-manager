const createConnection = require('../db');

const getById = async (id) => {
    const connection = await createConnection();
    const [rows] = await connection.query(`UPDATE types
                                           SET name = ?
                                           WHERE id = ?`, [name, id]);

    return rows.length > 0 ? rows[0] : null;
};

const getAll = async () => {
    const connection = await createConnection();
    const [rows] = await connection.query(`SELECT *
                                           FROM types`)
    return rows;
};

const getByName = async (name) => {
    const connection = await createConnection();
    const [rows] = await connection.execute('SELECT * FROM types WHERE name = ?', [name]);
    return rows.length > 0 ? rows[0] : null;
};

const deleteById = async (id) => {
    const connection = await createConnection();
    await connection.execute(`DELETE
                              FROM types
                              WHERE id = ?`, [id]);
};

const create = async (name) => {
    const connection = await createConnection();
    const [result] = await connection.execute('INSERT INTO types (name) VALUES (?)', [name]);

    return {name: name, id: result.insertId};
};

const update = async (name, id) => {
    const connection = await createConnection();
    await connection.query(`UPDATE types
                            SET name = ?
                            WHERE id = ?`, [name, id])

    return {name: name, id: id};
};

const countTypes = async (typeIds) => {
    const connection = await createConnection();

    const [rows] = await connection.query(`SELECT COUNT(*) AS total
                                           FROM types t
                                           WHERE t.id IN ?`, [typeIds]);
    return rows.length > 0 ? rows[0].total : 0;
};

const getAllInList = async (ids) => {
    const connection = await createConnection();

    const [rows] = await connection.query(`SELECT *
                                           FROM types t
                                           WHERE t.id IN ?`, [ids]);

    return rows;
};

const countAll = async () => {
    const connection = await createConnection();

    const [rows] = await connection.query(`SELECT COUNT(*) AS total
                                           FROM types`);
    return rows.length > 0 ? rows[0].total : 0;
};

const getAllPaginated = async (page, offset) => {
    const connection = await createConnection();

    const [rows] = await connection.query(`SELECT *
                                           FROM types
                                           LIMIT ? OFFSET ?`, [page, offset]);

    return rows;
};

module.exports = {
    getById,
    getAll,
    deleteById,
    create,
    getByName,
    update,
    countTypes,
    getAllInList,
    countAll,
    getAllPaginated
};