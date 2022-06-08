const express = require('express');
const router = express.Router();
const homeController = require('./controllers/homeController.js');
const cubeController = require('./controllers/cubeController.js');
const accessoryController = require('./controllers/accessoryController');
const userController = require('./controllers/userController');
const apiCubeController = require('./api/apiController');

router.use('/', homeController);
router.use('/cube', cubeController);
router.use('/accessory', accessoryController);
router.use('/users', userController);
router.use('/api', apiCubeController);

module.exports = router;