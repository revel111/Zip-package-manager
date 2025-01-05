const createConnection = require("../db");

const findByIds = async (ids) => {
    const connection = await createConnection();
    const [rows] = await connection.query(`SELECT id, name
                                           FROM roles
                                           WHERE id IN (?)`, [ids]);
    return rows;
};

const getByName = async (roleName) => {
    const connection = await createConnection();
    const [rows] = await connection.query(`SELECT *
                                           FROM roles
                                           WHERE name = ?`, [roleName]);
    return rows.length > 0 ? rows[0] : null;
};

module.exports = {
    getByName,
    findByIds
};