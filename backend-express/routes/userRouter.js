const express = require('express');
const router = express.Router();
const {getUserById, createUser} = require('../services/userService');
const {getZipsByUserId} = require("../services/zipService");

router.post('/', async (req, res) => {
    const {email, password, nickname, confirmPassword} = req.body;
    res.status(200).send(await createUser(email, password, confirmPassword, nickname));
});

router.get('/:id', async (req, res) => {
    res.status(200).send(await getUserById(req.params.id));
});

router.get('/:id/zips', async (req, res) => {
    res.status(200).send(await getZipsByUserId(req.params.id));
});

module.exports = router;