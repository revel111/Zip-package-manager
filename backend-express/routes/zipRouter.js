const multer = require("multer");
const express = require('express');
const {createZip, getZipById, deleteZipById, getPaginatedZips} = require('../services/zipService');
const {getAllTypesByZipId} = require("../services/zipTypesService");
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({storage});

router.post('/', upload.single('blob'), async (req, res) => {
    const {name, types, fileName} = req.body;
    const zip = req.file;

    res.status(200).send(await createZip({name, fileName, zip, types}));
});

router.get('/:id', async (req, res) => {
    res.status(200).send(await getZipById(req.params.id));
});

router.delete('/:id', async (req, res) => {
    res.status(200).send(await deleteZipById(req.params.id));
});

router.get('/paginated', async (req, res) => {
    const page = parseInt(req.params.page) || 1;
    const pageSize = parseInt(req.params.pageSize) || 10;
    const name = req.params.name;

    res.status(200).json(await getPaginatedZips(name, page, pageSize));
});

router.get('/:id/types', async (req, res) => {
    res.status(200).json(await getAllTypesByZipId(req.params.id));
});

module.exports = router;