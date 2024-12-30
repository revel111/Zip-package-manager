const express = require('express');
const router = express.Router();
const {getUserById, createUser, login, logout, getAllUsers, refresh, deleteUser} = require('../services/userService');
const {getZipsByUserId} = require("../services/zipService");
const authHandler = require("../handlers/authHandler");

router.post('/register', async (req, res) => {
    const {email, password, nickname, confirmPassword} = req.body;
    const data = await createUser(email, password, nickname, confirmPassword);
    res.cookie('refreshToken', data.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
    res.status(200).send(data);
});

router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const data = await login(email, password);
    res.cookie('refreshToken', data.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
    res.status(200).send(data);
});

router.post('/logout', async (req, res) => {
    const {refreshToken} = req.cookies;
    res.clearCookie('refreshToken');
    res.status(200).send(await logout(refreshToken));
});

router.get('/refresh', async (req, res) => {
    const {refreshToken} = req.cookies;
    const data = await refresh(refreshToken);
    res.cookie('refreshToken', data.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
    res.status(200).send(data);
});

router.get('/', async (req, res) => {
    res.status(200).send(await getAllUsers());
});

router.get('/:id', async (req, res) => {
    res.status(200).send(await getUserById(req.params.id));
});

router.get('/:id/zips', async (req, res) => {
    res.status(200).send(await getZipsByUserId(req.params.id));
});

router.delete('/:id', async (req, res) => {
    await deleteUser(req.params.id);
    res.status(200).json();
});

module.exports = router;