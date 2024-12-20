const express = require('express');
const {
    getAllZipTypes,
    createZipType,
    deleteZipType,
    updateZipType,
    getPaginatedTypes
} = require("../services/typesService")
const router = express.Router();

router.get('/', async (req, res) => {
    res.status(200).json(await getAllZipTypes());
});

router.get('/pages', async (req, res) => {
    const page = parseInt(req.params.page) || 1;
    const pageSize = parseInt(req.params.pageSize) || 10;

    res.status(200).json(await getPaginatedTypes(page, pageSize));
});

router.post('/', async (req, res) => {
    res.status(200).json(await createZipType(req.body["name"]));
});

router.delete('/:id', async (req, res) => {
    await deleteZipType(req.params.id);
    res.status(200).json();
})

router.put('/:id', async (req, res) => {
    res.status(200).json(await updateZipType(req.params.id, req.body["name"]));
});

module.exports = router;