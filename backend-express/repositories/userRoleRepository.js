const createConnection = require("../db");
const {getByName} = require("./roleRepository");

const findRolesByUserId = async (userId) => {
    const connection = await createConnection();

    const [rows] = await connection.query(`SELECT role_id
                                           FROM users_roles
                                           WHERE user_id = ?`, [userId]);

    return rows ? rows : [];
};

const save = async (user_id, roleName) => {
    const connection = await createConnection();
    const role = await getByName(roleName);

    await connection.execute(`INSERT INTO users_roles (user_id, role_id)
                              VALUES (?, ?)`, [user_id, role.id]);

    return {user_id: user_id, role_id: role.id};
};

const deletePos = async (user_id, roleName) => {
    const connection = await createConnection();
    const role = await getByName(roleName);

    const [res] = await connection.execute(`DELETE
                                            FROM users_roles
                                            WHERE user_id = ?
                                              AND role_id = ?`, [user_id, role.id]);
    return {user_id: user_id, role_id: role.id};
};

const deleteByUserId = async (id) => {
    const connection = await createConnection();
    await connection.execute(`DELETE
                              FROM users_roles
                              WHERE user_id = ?`, [id]);
};

const userHasRole = async (userId, roleId) => {
    const connection = await createConnection();
    const [rows] = await connection.query(`SELECT *
                                           FROM users_roles
                                           WHERE user_id = ?
                                             AND role_id = ?`, [userId, roleId]);
    return rows.length > 0;
};

const findEntriesByIds = async (userId, roleId) => {
    const connection = await createConnection();
    const [rows] = await connection.query(`
        SELECT date_of_modification
        FROM users_roles
        WHERE user_id = ?
          AND role_id = ?
    `, [userId, roleId]);

    return {
        user_id: userId,
        role_id: roleId,
    };
};

module.exports = {
    findRolesByUserId,
    save,
    deleteByUserId,
    userHasRole,
    deletePos,
    findEntriesByIds
};