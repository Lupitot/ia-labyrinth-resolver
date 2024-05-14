const express = require('express');
const mongoose = require('mongoose');
const compression = require('compression');
const bodyParser = require('body-parser');
const DB = require('./config').DB;

const app = express();
app.use(compression());

// Passby CORS errors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});



app.use(bodyParser.json());
// ROUTES
console.log('test1');
const apiRoutes = require('./routes/api');
const LevelRoutes = require('./routes/level');
const obstaclesRoutes = require('./routes/obstacles');
const testLvlRoutes = require('./routes/testLvl');
const userRoutes = require('./routes/users');
console.log('test2');


app.use('/api/', apiRoutes);
app.use('/api/level/', LevelRoutes);
app.use('/api/obstacles/', obstaclesRoutes);
app.use('/api/testLvl/', testLvlRoutes);
app.use('/api/users/', userRoutes);
console.log('test3');


mongoose.connect(DB).then(() => {
    console.log('Connected to MongoDB with Success !');
}).catch((err) => {
    console.log('MongoDB ERROR', err);
});



module.exports = app;