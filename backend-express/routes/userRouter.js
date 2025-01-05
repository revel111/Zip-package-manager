const express = require('express');
const router = express.Router();
const {
    getUserById,
    createUser,
    login,
    logout,
    getAllUsers,
    refresh,
    deleteUser,
    changeUserPassword, updateUser
} = require('../services/userService');
const {getZipsByUserId} = require("../services/zipService");
const authHandler = require("../handlers/authHandler");
const {saveUserIdRole, isUserAdmin, deleteUserIdRole} = require("../services/roleService");
const {userHasRole} = require("../repositories/userRoleRepository");

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

router.post('/:id/promote', async (req, res) => {
    await saveUserIdRole(req.params.id, "admin");
    res.status(200).send();
});

router.post('/:id/demote', async (req, res) => {
    await deleteUserIdRole(req.params.id, "admin");
    res.status(200).send();
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

router.get('/:id/isAdmin', async (req, res) => {
    res.status(200).send(await isUserAdmin(req.params.id, "admin"));
});

router.get('/:id/zips', async (req, res) => {
    res.status(200).send(await getZipsByUserId(req.params.id));
});

router.delete('/:id', authHandler, async (req, res) => {
    await deleteUser(req.params.id);
    res.status(200).send();
});

router.put('/', authHandler, async (req, res) => {
    const {nickname, email} = req.body;
    const ogEmail = req.user.email;
    res.status(200).send(await updateUser(ogEmail, email, nickname));
});

router.put('/change-password', authHandler, async (req, res) => {
    const {ogPassword, changedPassword, confirmPassword} = req.body;
    const email = req.user.email;
    res.status(200).send(await changeUserPassword(email, ogPassword, changedPassword, confirmPassword));
});

module.exports = router;