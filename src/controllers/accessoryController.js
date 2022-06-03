const router = require('express').Router();
const accessoryService = require('../services/accessoryService');

router.get('/create', (req, res) => {
    res.render('createAccessory');
});

router.post('/create', async (req, res) => {
    const accessory = req.body;

    await accessoryService.create(accessory)
        .then(() => {
            res.redirect('/');
        })
        .catch((err) => {
            console.log(err);
        })
});


module.exports = router;