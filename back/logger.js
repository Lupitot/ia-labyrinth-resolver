const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.colorize({colors: ["red"]}),
        winston.format.printf(({message}) => {
            return new Date().toISOString() + ' : ' + message;
        })
    ),
    transports: [
        new winston.transports.File({ filename: 'info.log', level: 'info'}),
        new winston.transports.File({ filename: 'error.log', level: 'error'}),
        new winston.transports.File({ filename: 'debug.log', level: 'debug'}),
    ]
});

module.exports = logger;