 // server.js
const http = require('http');
const path = require('path');
const app = require('./app');

const port = process.env.PORT || 3000; 


const server = http.createServer(app);

server.listen(port);

console.log('Server created');
console.log('Listen on port ' + port + '!');