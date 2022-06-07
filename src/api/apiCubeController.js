const router = require('express').Router();
const path = require('path');
const cubeService = require('../services/cubeService');
const accessoryService = require('../services/accessoryService');


router.get('/cubes', async (req, res) => {
    const cubes = await cubeService.getAllApi().lean();
    res.send(cubes);
});

router.get('/cubes/:id', async (req, res) => {
    const cube = await cubeService.getOne(req.params.id).lean();
    res.send(cube);
})

router.get('/accessories', async (req, res) => {
    const accessories = await accessoryService.getAll().lean();
    res.send(accessories);
})

router.get('/cubes/:id/details', async (req, res) => {
    const cube = await cubeService.getOneDetails(req.params.id).lean();
    res.send(cube);
});
module.exports = router;