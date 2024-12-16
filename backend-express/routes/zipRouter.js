const multer = require("multer");
const express = require('express');
const {createZip} = require('../services/zipService');
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', upload.single('blob'), async (req, res) => {
    const {name, types, fileName} = req.body;
    const zip = req.file;

    res.status(200).send(await createZip({name, fileName, zip, types}));
});

module.exports = router;