const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {type:String, required: true},
    email: {type:String, required: true, unique: true},
    password: {type:String, required: true},
    status : {type:String, required: true},
    creationDate: {type:Date, required: true},
    modificationDate: {type:Date, required: true},
    active: {type:Boolean, required: true},
});

module.exports = mongoose.model('Users', userSchema);