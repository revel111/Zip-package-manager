const express = require('express');
const router = express.Router();

router.post('/:id', (req, res) => {
    const {userId, role} = req.params;
});

router.get('/:name', (req, res) => {
    const {name} = req.params;


});

module.exports = router;