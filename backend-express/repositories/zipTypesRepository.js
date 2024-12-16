const createConnection = require('../db');

const deleteAllByTypeId = async (typeId) => {
    const connection = createConnection();
    await connection.execute(`DELETE
                              FROM zip_types
                              WHERE type_id = ?`, [typeId]);
};

const saveAllTypeIds = async (typeIds, zipId) => {
    const connection = createConnection();

    const records = typeIds.map(typeId => [typeId, zipId]);
    await connection.query(`INSERT INTO zip_types (type_id, zip_id)
                            VALUES ?`, [records]);
};

module.exports = {
    deleteAllByTypeId,
    saveAllTypeIds
};