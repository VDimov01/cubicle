const mongoose = require('mongoose');

const accessorySchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        validate: {
            validator: function() {
                return this.imageUrl.startsWith('http');
            },
            message: 'ImageUrl should be link!' 
        },
        required: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 120
    }
    // cubes: {
    //     type: mongoose.Types.ObjectId,
    //     ref: 'Cube'
    // }
});

const Accessory = mongoose.model('Accessory', accessorySchema);

exports.Accessory = Accessory;