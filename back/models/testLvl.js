const mongoose = require('mongoose');

const TestLvl = mongoose.Schema({
    name_level: {type:String, required: true},
    passage_date: {type:Date, required: true},
    result: {type:String, required: false},
});

module.exports = mongoose.model('DandD', TestLvl);     