const express = require('express');
const router = express.Router();
const {getZipCount} = require('../services/zipService')
const {getUserCount} = require('../services/userService')

router.get('/', async (req, res) => {
    res.status(200).json({
            userCount: await getUserCount(),
            zipCount: await getZipCount()
        }
    );
});

module.exports = router;