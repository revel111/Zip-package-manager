const {findRolesByUserId, save} = require("../repositories/userRoleRepository");
const {deleteByUserId} = require("../repositories/roleRepository");

const getAllRolesByUserId = async (userId) => {
    return findRolesByUserId(userId);
};

const saveUserIdRole = async (userId, roleName) => {
    return save(userId, roleName);
};

const deleteRoleByUserId = async (userId) => {
    await deleteByUserId(userId);
};

module.exports = {
    getAllRolesByUserId,
    saveUserIdRole,
    deleteRoleByUserId
}