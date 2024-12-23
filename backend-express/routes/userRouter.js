const express = require('express');
const router = express.Router();
const {getUserById} = require('../services/userService')

router.get('/:id', async (req, res) => {
    res.status(200).send(await getUserById(req.params.id));
});

module.exports = router;