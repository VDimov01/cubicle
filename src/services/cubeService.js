const {Cube} = require('../models/Cube');
const { Accessory } = require('../models/Accessory');

exports.create = (cube) => {
    return Cube.create(cube);
}

exports.getOne = (cubeId) => Cube.findById(cubeId);

exports.getOneDetails = (cubeId) => Cube.findById(cubeId).populate('accessories');

exports.getAllApi = () => Cube.find();
    
exports.getAll = async (search = '', fromInput, toInput) => {
    const from = Number(fromInput) || 0;
    const to = Number(toInput) || 6;

    let cubes = await Cube.find({name: {$regex: new RegExp(search, 'i')}})
        .where('difficultyLevel').lte(to).gte(from)
        .lean();
    
        
    // const result = cubes
    // .filter(x => x.name.toLowerCase().includes(search.toLowerCase()))
    // .filter(x => (Number(x.difficultyLevel) >= from && Number(x.difficultyLevel) <= to))

    return JSON.stringify(cubes);
};

exports.attachAccessory = async (cubeId, accessoryId) => {
    const cube = await Cube.findById(cubeId);
    const accessory = await Accessory.findById(accessoryId);

    cube.accessories.push(accessory);
    accessory.cubes.push(cube);

    await cube.save();
    await accessory.save();

    return cube;
};