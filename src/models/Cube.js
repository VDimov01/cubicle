const mongoose = require('mongoose');
const cubeSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        maxlength: 1000
    },
    imageUrl: {
        type: String,
        required: true,
        
    },
    difficultyLevel: {
        type: Number,
        required: true,
        min: 1,
        max: 6,
    }
});

cubeSchema.path('imageUrl').validate(function() {
    return this.imageUrl.startsWith('http');
}, 'ImageUrl should be a link');

const Cube = mongoose.model('Cube', cubeSchema);

exports.Cube = Cube;