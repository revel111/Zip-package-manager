const {countAllUsers, getById, getByEmail, create, update, getAll, deleteById} = require('../repositories/userRepository')
const {HandlingError} = require("../handlers/errorHandler");
const bcrypt = require('bcrypt');
const {generateTokens, saveToken, removeToken, validateToken, findByToken} = require("./jwtService");
const {saveUserIdRole, getAllRolesByUserId, deleteRoleByUserId} = require("./roleService");
const {deleteTokenById} = require("../repositories/tokenRepository");

const getUserCount = async function () {
    return await countAllUsers();
};

const getUserById = async (id) => {
    const user = await getById(id);

    if (!user)
        throw new HandlingError(404, "User wasn't found.");

    return user;
};

const getAllUsers = async () => {
    return getAll();
}

const createUser = async (email, password, nickname, confirmPassword) => {
    await validateUser(email, password, nickname, confirmPassword);
    password = await hashPassword(password);

    const user = await create(email, password, nickname);
    const role = await saveUserIdRole(user.id, 'user');
    const tokens = generateTokens({id: user.id, email: email});
    await saveToken(user.id, tokens.refreshToken);

    return {
        ...tokens,
        user: {
            id: user.id,
            email: user.email,
            role: role
        }
    };
};

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
};

const login = async (email, password) => {
    const user = await getByEmail(email);

    if (!user)
        throw new HandlingError(401, 'Wrong email.');

    if (!await bcrypt.compare(password, user.password))
        throw new HandlingError(401, 'Wrong password.');

    const tokens = generateTokens({id: user.id, email: email});
    await saveToken(user.id, tokens.refreshToken);

    const roles = await getAllRolesByUserId(user.id);

    return {
        ...tokens,
        user: {
            id: user.id,
            email: user.email,
            roles: roles
        }
    };
};

const logout = async (refreshToken) => {
    await removeToken(refreshToken);
    return refreshToken;
};

const refresh = async (refreshToken) => {
    if (!refreshToken)
        throw new HandlingError(401, 'Wrong refresh token.');

    const data = validateToken(refreshToken, 'refresh');
    const tokenFromDb = await findByToken(refreshToken);
    if (!tokenFromDb || !data)
        throw new HandlingError(401, 'Wrong access token.');

    const user = await getUserById(tokenFromDb.user_id);
    const tokens = generateTokens({id: user.id, email: user.email});
    await saveToken(user.id, tokens.refreshToken);

    const roles = await getAllRolesByUserId(user.id);

    return {
        ...tokens,
        user: {
            id: user.id,
            email: user.email,
            roles: roles
        }
    };
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

const deleteUser = async (id) => {
    await deleteRoleByUserId(id);
    await deleteById(id);
    await deleteTokenById(id);
};

module.exports = {
    getUserCount,
    getUserById,
    createUser,
    login,
    logout,
    refresh,
    getAllUsers,
    deleteUser
};