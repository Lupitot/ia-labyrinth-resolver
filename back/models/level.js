const mongoose = require('mongoose');

const Level = mongoose.Schema({
    name: {type:String, required: true},
    creator: {type:String, required: true},
    composition: {type: [[Number]], required: true},
    creationDate: {type:Date, required: true},
    modificationDate: {type:Date, required: true},
    active: {type:Boolean, required: true},
});

module.exports = mongoose.model('Level', Level);     
