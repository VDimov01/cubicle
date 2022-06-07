const router = require('express').Router();
const cubeService = require('../services/cubeService');
const fetch = require('node-fetch');

router.get('/', async (req, res) => {
    // let {search, from, to} = req.query;
    // const cubes = JSON.parse(await cubeService.getAll(search, Number(from), Number(to)));
    // res.render('index', {cubes, search, from, to});

    const response = await fetch('http://localhost:5000/api/cubes');
    const cubes = await response.json();
    
    res.render('index', {cubes});

});

// router.get('/ap', async (req, res) => {
//     let response = await fetch('http://localhost:5000/api/cubes')
//     let data = await response.json();

//     res.send(data);
// });

router.get('/about', (req, res) => {
    res.render('about');
});

module.exports = router;