const mongoose = require('mongoose');

const TestLvl = mongoose.Schema({
    name_level: {type:String, required: true},
    passage_date: {type:Date, required: true},
    result: {type:String, required: false},
    creationDate: {type:Date, required: true},
    modificationDate: {type:Date, required: true},
    creationUser: {type:String, required: true},
    modificationUser: {type:String, required: true},
    active: {type:Boolean, required: true},
});

module.exports = mongoose.model('TestLvl', TestLvl);     