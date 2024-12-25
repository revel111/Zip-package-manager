const express = require('express');
const router = express.Router();
const {getUserById} = require('../services/userService');
const {getZipsByUserId} = require("../services/zipService");

router.get('/:id', async (req, res) => {
    res.status(200).send(await getUserById(req.params.id));
});

router.get('/:id/zips', async (req, res) => {
    res.status(200).send(await getZipsByUserId(req.params.id));
});

module.exports = router;