const createConnection = require('../db');

const countAllZips = async function () {
    const connection = await createConnection();
    const [rows] = await connection.query(`SELECT COUNT(*) AS total
                                           FROM zips`);
    return rows.length > 0 ? rows[0].total : 0;
};

const create = async function (name, fileName, zip) {
    const connection = await createConnection();
    const [result] = await connection.execute('INSERT INTO zips (name, file_name, zip_file, user_id) VALUES (?, ?, ?, ?)', [name, fileName, zip, 0]);

    return {name: name, id: result.insertId, fileName: fileName};
};

const getById = async (id) => {
    const connection = await createConnection();
    const [rows] = await connection.execute('SELECT id, name, user_id, file_name, date_of_creation, date_of_modification FROM zips WHERE id = ?', [id]);

    return rows.length > 0 ? rows[0] : null;
};

const deleteById = async (id) => {
    const connection = await createConnection();
    await connection.execute(`DELETE
                              FROM zips
                              WHERE id = ?`, [id]);
};

const getPaginatedByName = async (name, page, offset) => {
    const connection = await createConnection();

    let rows;

    if (name)
        [rows] = await connection.query(`SELECT *
                                         FROM zips
                                         WHERE name LIKE ?
                                         LIMIT ? OFFSET ?`, [`%${name}%`, page, offset])
    else
        [rows] = await connection.query(`SELECT *
                                         FROM zips
                                         LIMIT ? OFFSET ?`, [page, offset])

    return rows;
};

module.exports = {
    countAllZips,
    create,
    getById,
    deleteById,
    getPaginatedByName
};