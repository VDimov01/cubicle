const router = require('express').Router();
const path = require('path');
const cubeService = require('../services/cubeService');
const accessoryService = require('../services/accessoryService');


router.get('/cubes', async (req, res) => {
    const cubes = await cubeService.getAllApi().lean();
    res.send(cubes);
});

router.get('/cubes/:id/details', async (req, res) => {
    const cube = await cubeService.getOneDetails(req.params.id).lean();
    res.send(cube);
});

router.get('/cubes/:id', async (req, res) => {
    const cube = await cubeService.getOne(req.params.id).lean();
    res.send(cube);
})

router.get('/accessories', async (req, res) => {
    const accessories = await accessoryService.getAll().lean();
    res.send(accessories);
})

router.get('/accessories/:id', async (req, res) => {
    const arrId = req.params.id.split(',');
    const accessories = await accessoryService.getAllAvailable(arrId).lean();
    res.send(accessories);
});

router.post('/accessories', async (req, res) => {
    const accessory = req.body;
    await accessoryService.create(accessory);
    
    res.redirect('/');
});

router.post('/cubes', async (req, res) => {
    const cube = req.body;

    await cubeService.create(cube);

    res.redirect('/');
});

router.post('/cubes/attach/:cubeId', async (req, res) => {
    const cubeId = req.params.cubeId;
    const accessoryId = req.body.accessoryId;
    console.log(req.body);

    await cubeService.attachAccessory(cubeId, accessoryId);

    res.redirect(`/cube/details/${req.params.cubeId}`);
});

module.exports = router;