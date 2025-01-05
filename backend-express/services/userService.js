const {
    countAllUsers,
    getById,
    getByEmail,
    create,
    update,
    getAll,
    deleteById, changePassword
} = require('../repositories/userRepository')
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

    const existingUser = await getByEmail(email);
    if (existingUser)
        throw new HandlingError(409, "Email was registered.");

    const user = await create(email, password, nickname);
    const role = await saveUserIdRole(user.id, 'user');
    const roles = [role];
    const tokens = generateTokens({id: user.id, email: user.email, roles: roles});
    await saveToken(user.id, tokens.refreshToken);

    return {
        ...tokens,
        user: {
            id: user.id,
            email: user.email,
            nickname: user.nickname,
            roles: roles
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
    const roles = await getAllRolesByUserId(user.id);
    const tokens = generateTokens({id: user.id, email: user.email, roles: roles});
    await saveToken(user.id, tokens.refreshToken);


    return {
        ...tokens,
        user: {
            id: user.id,
            email: user.email,
            nickname: user.nickname,
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
    const roles = await getAllRolesByUserId(user.id);
    const tokens = generateTokens({id: user.id, email: user.email, roles: roles});
    await saveToken(user.id, tokens.refreshToken);

    return {
        ...tokens,
        user: {
            id: user.id,
            email: user.email,
            nickname: user.nickname,
            roles: roles
        }
    };
};

const deleteUser = async (id) => {
    await deleteRoleByUserId(id);
    await deleteById(id);
    await deleteTokenById(id);
};

const validateUser = async (email, password, nickname, confirmPassword) => {
    testEmail(email);

    testPassword(password, confirmPassword);

    testNickname(nickname);
};

const testPassword = (password, confirmPassword) => {
    if (!password) {
        throw new HandlingError(400, 'Invalid password.');
    }

    const passwordPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if (!passwordPattern.test(password)) {
        throw new HandlingError(400, 'Invalid password.');
    }

    if (confirmPassword !== password) {
        throw new HandlingError(400, 'Password does not match.');
    }
};

const testEmail = (email) => {
    if (!email) {
        throw new HandlingError(400, 'Invalid email address.');
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        throw new HandlingError(400, 'Invalid email address.');
    }
};

const testNickname = (nickname) => {
    if (!nickname) {
        throw new HandlingError(400, 'Nickname should be 2 - 10 symbols long.');
    }

    nickname = nickname.trim();
    if (nickname.length < 2 || nickname.length > 10) {
        throw new HandlingError(400, 'Invalid nickname.');
    }
}

const updateUser = async (ogEmail, email, nickname) => {
    if (ogEmail !== email && await getByEmail(email))
        throw new HandlingError(409, "Email was registered.");

    testEmail(email);

    testNickname(nickname);
    await update(ogEmail, email, nickname);
};

const changeUserPassword = async (email, ogPassword, changedPassword, confirmPassword) => {
    const user = await getByEmail(email);

    if (!user)
        throw new HandlingError(401, 'Wrong email.');

    if (!await bcrypt.compare(ogPassword, user.password))
        throw new HandlingError(401, 'Wrong password.');

    testPassword(changedPassword, confirmPassword);

    changedPassword = await hashPassword(changedPassword);
    await changePassword(email, changedPassword);
};

module.exports = {
    getUserCount,
    getUserById,
    createUser,
    login,
    logout,
    refresh,
    getAllUsers,
    deleteUser,
    updateUser,
    changeUserPassword
};