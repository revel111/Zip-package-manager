const createConnection = require("../db");

const findRolesByUserId = async (userId) => {
    const connection = await createConnection();

    const [rows] = await connection.query(`SELECT role_id
                                           FROM users_roles
                                           WHERE user_id = ?`, [userId]);

    return rows ? rows[0] : [];
};

const save = async (user_id, roleName) => {
    const connection = await createConnection();
    const role = await getByName(roleName);

    const [res] = await connection.execute(`INSERT INTO users_roles (user_id, role_id)
                                            VALUES (?, ?)`, [user_id, role.id]);
    return {user_id: user_id, role_id: role.id};
};

const getByName = async (roleName) => {
    const connection = await createConnection();

    const [rows] = await connection.query(`SELECT *
                                           FROM roles
                                           WHERE name = ?`, [roleName]);
    return rows.length > 0 ? rows[0] : null;
};

module.exports = {
    findRolesByUserId,
    save
};