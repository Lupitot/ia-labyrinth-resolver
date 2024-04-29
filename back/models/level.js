const mongoose = require('mongoose');

const Level = mongoose.Schema({
    name: {type:String, required: true},
    creator: {type:String, required: true},
    creation_date: {type:Date, required: false},
    modification_date: {type:Date, required: true},
    composition: {type:Array, required: false},
});

module.exports = mongoose.model('DandD', Level);     