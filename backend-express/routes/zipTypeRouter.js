const express = require('express');
const {getAllZipTypes, deleteZipType} = require("../repositories/zipTypesRepository");
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const types = await getAllZipTypes();
        res.status(200).json(types);
    } catch (error) {
        console.error('Error fetching zip types:', error);
        res.status(500).json({error: 'Failed to fetch zip types.'});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const types = await (deleteZipType(req.params.id));
        res.status(200).json(types);
    } catch (error) {
        console.error('Error deleting zip type:', error);
        res.status(500).json({error: 'Failed to delete zip type.'});
    }
});

module.exports = router;