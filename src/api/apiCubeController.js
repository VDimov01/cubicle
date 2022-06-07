const router = require('express').Router();
const path = require('path');
const cubeService = require('../services/cubeService');
//const accessoryService = require('../services/accessoryService');


router.get('/', async (req, res) => {
    const cubes = await cubeService.getAllApi();
    res.send(cubes);
});

module.exports = router;