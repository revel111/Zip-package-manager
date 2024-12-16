const express = require('express');
const {getAllZipTypes, createZipType, deleteZipType, updateZipType} = require("../services/typesService")
const router = express.Router();

router.get('/', async (req, res) => {
    res.status(200).json(await getAllZipTypes());
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