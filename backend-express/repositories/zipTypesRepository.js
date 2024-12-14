const connection = require('../db');

const getAll = async () => {
    return await connection.query(`SELECT *
                                   FROM types`);
};

const getByName = async (name) => {
    const [rows] = await connection.execute('SELECT * FROM types WHERE name = ?', [name]);
    return rows.length > 0 ? rows[0] : null;
};

const deleteById = async (id) => {
    await connection.execute(`DELETE
                              FROM types
                              WHERE id = ?`, [id]);
};

const create = async (name) => {
    const [result] = await connection.execute('INSERT INTO types (name) VALUES (?)', [name]);

    return {name: name, id: result.insertId};
};

const update = async (name, id) => {
    await connection.query(`UPDATE zip_types
                            SET name = ?
                            WHERE id = ?`, [name, id])

    return {name: name, id: id};
};

module.exports = {
    getAll,
    deleteById,
    create,
    getByName,
    update,
};