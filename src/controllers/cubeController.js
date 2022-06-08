const router = require('express').Router();
const path = require('path');
const fetch = require('node-fetch');
const cubeService = require('../services/cubeService');
const accessoryService = require('../services/accessoryService');

router.get('/create', (req, res) => {
        const token = req.cookies['jwt'];
        if(token){
           res.render('create');
        }else{
                res.send('You must be logged in to create a cube!');
        }
});

router.post('/create', async (req, res) => {
        const cube = req.body;
        //Validate
        // console.log(req.body);
        if (cube.name.length < 2) {
                return res.status(400).send('Invalid request!');
        }

        // //Save Data
        // await cubeService.create(cube)
        // .then(() => {
        //         //Redirect to page
        //         res.redirect('/');
        // })
        // .catch((err) => {
        //         res.status(400).send(err);
        // })

        await fetch('http://localhost:5000/api/cubes', {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json'
                },
                body: JSON.stringify(cube)
        })
        
        res.redirect('/');

});

router.get('/details/:id', async (req, res) => {
        //const cube = await cubeService.getOneDetails(req.params.id).lean();

        //console.log(cube);
        const response = await fetch('http://localhost:5000/api/cubes/' + req.params.id + '/details');
        const cube = await response.json();
      
        res.render('details', {cube});
});

router.get('/:cubeId/attach', async (req, res) => {
        // const cube = await cubeService.getOne(req.params.cubeId).lean();
        // const accessories = await accessoryService.getAllAvailable(cube.accessories).lean();
        // res.render('attachAccessory', {cube, accessories});

        const response = await fetch('http://localhost:5000/api/cubes/' + req.params.cubeId);
        const cube = await response.json();

        const accResponse = await fetch('http://localhost:5000/api/accessories/' + cube.accessories);
        const accessories = await accResponse.json();

        res.render('attachAccessory', {cube, accessories});
});

router.get('/:cubeId/delete', async (req, res) => {
        const response = await fetch('http://localhost:5000/api/cubes/' + req.params.cubeId);
        const cube = await response.json();

        res.render('delete', {cube});
});

router.post('/:cubeId/delete', async (req, res) => {
        const cubeId = req.params.cubeId;
        await fetch('http://localhost:5000/api/cubes/delete/' + cubeId, {
                method: 'DELETE'
        });

        res.redirect('/');
});

router.post('/:cubeId/attach', async (req, res) => {
        const accessoryId = req.body.accessory;
        
        // await cubeService.attachAccessory(req.params.cubeId, accessoryId);
        // res.redirect(`/cube/details/${req.params.cubeId}`);
        console.log(JSON.stringify(accessoryId));

        await fetch('http://localhost:5000/api/cubes/attach/' + req.params.cubeId, {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json'
                },
                body: JSON.stringify({accessoryId})
        })

        res.redirect(`/cube/details/${req.params.cubeId}`);
});



module.exports = router;