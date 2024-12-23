const {countAllUsers, getById} = require('../repositories/userRepository')
const {HandlingError} = require("../handlers/errorHandler");

const getUserCount = async function () {
    return await countAllUsers();
};

const getUserById = async (id) => {
    const user = await getById(id);

    if (!user)
        throw new HandlingError(404, "User wasn't found.");

    return user;
};

module.exports = {
    getUserCount,
    getUserById
};