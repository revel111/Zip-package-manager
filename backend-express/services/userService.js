const {countAllUsers, getById, getByEmail, create, update} = require('../repositories/userRepository')
const {HandlingError} = require("../handlers/errorHandler");
const {getByName} = require("../repositories/typesRepository");

const createUser = async (email, password, nickname, confirmPassword) => {
    await validateUser(email, password, nickname, confirmPassword);



    return await create(password, nickname, confirmPassword);
};

const getUserCount = async function () {
    return await countAllUsers();
};

const getUserById = async (id) => {
    const user = await getById(id);

    if (!user)
        throw new HandlingError(404, "User wasn't found.");

    return user;
};

const validateUser = async (email, password, nickname, confirmPassword) => {
    if (!email || !password || !nickname)
        throw new HandlingError(400, 'Wrong data was passed.');

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        throw new HandlingError(400, 'Invalid email address.');
    }

    const passwordPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if (!passwordPattern.test(password)) {
        throw new HandlingError(400, 'Invalid password.');
    }

    if (confirmPassword !== password) {
        throw new HandlingError(400, 'Passwords do not match.');
    }

    nickname = nickname.trim();
    if (nickname.length < 2 || nickname.length > 10) {
        throw new HandlingError(400, 'Invalid nickname.');
    }

    if (await getByEmail(email)) {
        throw new HandlingError(409, 'Email is already in use.');
    }
};

module.exports = {
    getUserCount,
    getUserById,
    createUser,
};