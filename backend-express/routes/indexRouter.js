const express = require('express');
const router = express.Router();
const {getZipCount} = require('../services/zipService');
const {getUserCount} = require('../services/userService');
const {countAllTypes} = require('../services/typesService');

router.get('/', async (req, res) => {
    res.status(200).json({
            userCount: await getUserCount(),
            zipCount: await getZipCount(),
            typeCount: await countAllTypes(),
        }
    );
});

module.exports = router;