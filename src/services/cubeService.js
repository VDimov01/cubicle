const fs = require('fs/promises')
const path = require('path');
const {Cube} = require('../models/Cube');
const cubes = require('../db.json');

exports.create = (cube) => {
    return Cube.create(cube);
}

exports.getOne = (cubeId) => Cube.findById(cubeId); 

exports.getAll = async (search = '', fromInput, toInput) => {
    let cubes = await Cube.find().lean();
    
    // const from = Number(fromInput) || 0;
    // const to = Number(toInput) || 6;

    // const result = cubes
    // .filter(x => x.name.toLowerCase().includes(search.toLowerCase()))
    // .filter(x => (Number(x.difficultyLevel) >= from && Number(x.difficultyLevel) <= to))

    return cubes;
};