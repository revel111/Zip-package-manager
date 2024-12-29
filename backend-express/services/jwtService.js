const jwt = require("jsonwebtoken");
const {getById, update, save, deleteByToken, getByToken} = require("../repositories/tokenRepository");
const dotenv = require('dotenv').config();

const generateTokens = (payload) => {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30s'});
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'});

    return {
        refreshToken: refreshToken,
        accessToken: accessToken
    };
};

const saveToken = async (userId, refreshToken) => {
    const tokenData = await getById(userId);

    if (tokenData) {
        await update(userId, refreshToken);
        return;
    }

    return await save(userId, refreshToken);
};

const removeToken = async (refreshToken) => {
    await deleteByToken(refreshToken);
};

const validateToken = (token, type) => {
    try {
        return jwt.verify(token, type === 'refresh'
            ? process.env.JWT_REFRESH_SECRET
            : process.env.JWT_ACCESS_SECRET);
    } catch (error) {
        return null;
    }
};

const findByToken = async (token) => {
    return getByToken(token);
};

module.exports = {
    generateTokens,
    saveToken,
    removeToken,
    validateToken,
    findByToken
};