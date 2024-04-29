const mongoose = require('mongoose');

const Level = mongoose.Schema({
    name: {type:String, required: true},
    creator: {type:String, required: true},
    composition: {type:Array, required: false},
    creationDate: {type:Date, required: true},
    modificationDate: {type:Date, required: true},
    creationUser: {type:String, required: true},
    modificationUser: {type:String, required: true},
    active: {type:Boolean, required: true},
    
    
});

module.exports = mongoose.model('DandD', Level);     
