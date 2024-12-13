const connection = require('../db');

const getAllZipTypes = async () => {
    return await connection.query(`SELECT *
                                   FROM types`);
};

const getZipTypeByName = async (name) => {
    const [rows] = await connection.execute('SELECT * FROM types WHERE name = ?', [name]);
    return rows.length > 0 ? rows[0] : null;
};

const deleteZipType = async (id) => {
    const [result] = await connection.execute(`DELETE
                                               FROM types
                                               WHERE id = ?`, [id]);

    return result.affectedRows > 0;
};

const createZipType = async (name) => {
    const [result] = await connection.execute('INSERT INTO types (name) VALUES (?)', [name]);

    return {name: name, id: result.insertId};
};

// const updateZipType = async (data) => {
//
// };

module.exports = {
    getAllZipTypes,
    deleteZipType,
    createZipType,
    getZipTypeByName,
};