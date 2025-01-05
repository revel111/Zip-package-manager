const express = require('express');
const {
    getAllZipTypes,
    createZipType,
    deleteZipType,
    updateZipType,
    getPaginatedTypes
} = require("../services/typesService")
const authHandler = require("../handlers/authHandler");
const adminHandler = require("../handlers/adminHandler");
const router = express.Router();

router.get('/pages', authHandler, adminHandler, async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    res.status(200).json(await getPaginatedTypes(page, pageSize));
});

router.get('/', authHandler, adminHandler, async (req, res) => {
    res.status(200).json(await getAllZipTypes());
});

router.post('/', authHandler, adminHandler, async (req, res) => {
    res.status(200).json(await createZipType(req.body["name"]));
});

router.delete('/:id', authHandler, adminHandler, async (req, res) => {
    await deleteZipType(req.params.id);
    res.status(200).json();
})

router.put('/:id', authHandler, adminHandler, async (req, res) => {
    res.status(200).json(await updateZipType(req.params.id, req.body["name"]));
});

module.exports = router;