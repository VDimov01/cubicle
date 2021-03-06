const router = require('express').Router();
const accessoryService = require('../services/accessoryService');
const fetch = require('node-fetch');


router.get('/create', (req, res) => {
    const token = req.cookies['jwt'];
    if(token){
        res.render('createAccessory');
    }else{
        res.send('You must be logged in to create an accessory!');
    }
});

router.post('/create', async (req, res) => {
    const accessory = req.body;

    // await accessoryService.create(accessory)
    //     .then(() => {
    //         res.redirect('/');
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     })

    await fetch('http://localhost:5000/api/accessories', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(accessory)
    })

    res.redirect('/');
});


module.exports = router;