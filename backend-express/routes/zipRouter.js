const multer = require("multer");
const express = require('express');
const {createZip, getZipById, deleteZipById, getPaginatedZips} = require('../services/zipService');
const {getAllTypesByZipId} = require("../services/zipTypesService");
const {getAllByName} = require("../repositories/zipRepository");
const authHandler = require("../handlers/authHandler");
// const adminHandler = require("../handlers/adminHandler");
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({storage});

router.post('/', upload.single('blob'), authHandler, async (req, res) => {
    const {name, types, fileName} = req.body;
    const zip = req.file;

    res.status(200).send(await createZip({name, fileName, zip, types}));
});

router.get('/paginated', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const name = req.query.name || '';

    res.status(200).json(await getPaginatedZips(name, page, pageSize));
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

});

module.exports = router;