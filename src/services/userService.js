const {User} = require('../models/User');

exports.create = (user) => User.create(user);

exports.login = (username, password) => User.findOne({username, password});

exports.getAll = () => User.find();