const mongoose = require('mongoose');

const Obstacle = mongoose.Schema({
    name: {type:String, required: true},
    traversable: {type:Boolean, required: true},
    effect: {type:String, required: false},
    appearance: {type:String, required: true},
    min: {type:Number, required: false},
    max: {type:Number, required: false},
});

module.exports = mongoose.model('DandD', Obstacle);     