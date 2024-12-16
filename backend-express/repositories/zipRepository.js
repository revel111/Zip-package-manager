const createConnection = require('../db');

const countAllZips = async function () {
    const connection = await createConnection();
    const [rows] = await connection.query(`SELECT COUNT(*) AS total
                                           FROM zips`);
    return rows.length > 0 ? rows[0].total : 0;
};

module.exports = {
    countAllZips,
};