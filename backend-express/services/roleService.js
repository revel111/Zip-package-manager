const {findRolesByUserId, save, deleteByUserId} = require("../repositories/userRoleRepository");
const {getByName, findByIds} = require("../repositories/roleRepository");
const {HandlingError} = require("../handlers/errorHandler");

const getAllRolesByUserId = async (userId) => {
    const rolesIds = await findRolesByUserId(userId);
    return findByIds(rolesIds.map(x => x.role_id));
};

const saveUserIdRole = async (userId, roleName) => {
    if (await getAllRolesByUserId(userId, roleName).some(x => x.name === roleName))
        throw new HandlingError(409, "User already has this role.");

    return save(userId, roleName);
};

const deleteRoleByUserId = async (userId) => {
    await deleteByUserId(userId);
};

const getRoleByName = async (roleName) => {
    return getByName(roleName);
};

module.exports = {
    getAllRolesByUserId,
    saveUserIdRole,
    deleteRoleByUserId,
    getRoleByName
}