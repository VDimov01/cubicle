const router = require('express').Router();
const path = require('path');
const cubeService = require('../services/cubeService');
const accessoryService = require('../services/accessoryService');
const userService = require('../services/userService');


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

router.get('/users', async (req, res) => {
    const users = await userService.getAll().lean();
    res.send(users);
})

router.post('/users/register', async (req, res) => {
    const user = req.body;
    await userService.create(user);

    res.send(user);
});

router.post('/users/login', async (req, res) => {
    const {username, password} = req.body;
    await userService.login(username, password);
    res.redirect('/');
});
//-----------------------------------------post
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

router.delete('/cubes/delete/:cubeId', async (req, res) => {
    const cubeId = req.params.cubeId;

    await cubeService.deleteOne(cubeId);

    res.redirect('/');
});

router.put('/cubes/edit/:cubeId', async (req, res) => {
    const cubeId = req.params.cubeId;
    const cube = req.body;
    
    await cubeService.editOne(cubeId, cube);

    res.redirect(`/cube/details/${cubeId}`);
});

module.exports = router;