const createConnection = require('../db');

const deleteAllByTypeId = async (typeId) => {
    const connection = await createConnection();
    await connection.execute(`DELETE
                              FROM zip_types
                              WHERE type_id = ?`, [typeId]);
};

const saveAllTypeIds = async (typeIds, zipId) => {
    const connection = await createConnection();

    const records = typeIds.map(typeId => [typeId, zipId]);
    await connection.query(`INSERT INTO zip_types (type_id, zip_id)
                            VALUES ?`, [records]);
};

const getAllByZipId = async (zipId) => {
    const connection = await createConnection();

    const [rows] = await connection.query(`SELECT * FROM zip_types WHERE zip_id = ?`, [zipId]);

    return rows.length > 0 ? rows : null;
};

const deleteAllByZipId = async (zipId) => {
    const connection = await createConnection();
    await connection.execute(`DELETE
                              FROM zip_types
                              WHERE zip_id = ?`, [zipId]);
};

module.exports = {
    deleteAllByTypeId,
    saveAllTypeIds,
    getAllByZipId,
    deleteAllByZipId
};