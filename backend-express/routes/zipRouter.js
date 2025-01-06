const multer = require("multer");
const express = require('express');
const {createZip, getZipById, deleteZipById, getPaginatedZips, getAllZips} = require('../services/zipService');
const {getAllTypesByZipId} = require("../services/zipTypesService");
const {getAllByName} = require("../repositories/zipRepository");
const authHandler = require("../handlers/authHandler");
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({storage});

router.post('/', authHandler, upload.single('file'), async (req, res) => {
    const {name, fileName, description} = req.body;
    let types = req.body.types;
    types = JSON.parse(types);
    const zip = req.file;
    const userId = req.user.id;

    res.status(200).send(await createZip(name, fileName, zip, types, userId, description));
});

router.get('/paginated', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const name = req.query.name || '';

    res.status(200).json(await getPaginatedZips(name, page, pageSize));
});

router.get('/', async (req, res) => {
    res.status(200).json(await getAllZips());
});

router.get('/names', async (req, res) => {
    const name = req.query.name || '';

    res.status(200).json(await getAllByName(name));
});

router.get('/:id', async (req, res) => {
    res.status(200).send(await getZipById(req.params.id));
});

router.delete('/:id', authHandler, async (req, res) => {
    res.status(200).send(await deleteZipById(req.params.id));
});

router.get('/:id/types', async (req, res) => {
    res.status(200).json(await getAllTypesByZipId(req.params.id));
});

router.get('/:id/download', async (req, res) => {
    res.status(200).json();
});

module.exports = router;