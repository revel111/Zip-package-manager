const createConnection = require("../db");

const deleteByUserId = async (id) => {
    const connection = await createConnection();
    await connection.execute(`DELETE
                              FROM users_roles
                              WHERE user_id = ?`, [id]);
};

module.exports = {
    deleteByUserId
};