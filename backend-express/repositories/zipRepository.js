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

module.exports = {
    countAllZips,
    create
};