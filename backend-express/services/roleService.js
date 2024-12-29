const {findRolesByUserId, save} = require("../repositories/userRoleRepository");

const getAllRolesByUserId = async (userId) => {
    return findRolesByUserId(userId);
};

const saveUserIdRole = async (userId, roleName) => {
    return save(userId, roleName);
};

module.exports = {
    getAllRolesByUserId,
    saveUserIdRole,
}