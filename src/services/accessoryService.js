const {Accessory} = require('../models/Accessory');

exports.create = (accessory) => Accessory.create(accessory);