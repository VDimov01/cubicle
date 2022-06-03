const router = require('express').Router();
const path = require('path');
const cubeService = require('../services/cubeService');
const accessoryService = require('../services/accessoryService');

router.get('/create', (req, res) => {
        res.render('create');
});

router.post('/create', async (req, res) => {
        const cube = req.body;
        //Validate
        if (cube.name.length < 2) {
                return res.status(400).send('Invalid request!');
        }

        //Save Data
        await cubeService.create(cube)
        .then(() => {
                //Redirect to page
                res.redirect('/');
        })
        .catch((err) => {
                res.status(400).send(err);
        })

});

router.get('/details/:id', async (req, res) => {
        const cube = await cubeService.getOne(req.params.id).lean();
        console.log(cube);
        res.render('details', {cube});
});

router.get('/:cubeId/attach', async (req, res) => {
        const cube = await cubeService.getOne(req.params.cubeId).lean();
        const accessories = await accessoryService.getAll().lean();

        res.render('attachAccessory', {cube, accessories});
});

module.exports = router;