const jwt = require('jsonwebtoken');
const User = require('../models/users');
const logger = require('../logger');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodeToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        console.log("le token decodé", decodeToken);
        const userId = decodeToken.id;
        console.log("le userId", userId);

        User.findOne({_id: userId}).then((user) => {
            console.log("le userid avant le find",userId);
            console.log("le user avant le find",user);
            console.log("le user status avant le find",user.status);
            
            if(user.status === 'admin'){
                logger.info({message: 'un Admin fait une requête'});
                req.isAdmin = user.status === 'admin';
            } else {
                logger.info({message: user.name + ' fait une requête'});
            }
            next();
        }).catch((err) => {
            logger.error({message: 'Erreur lors de la recherche de l\'utilisateur : ' + err.toString()})
            res.status(403).json({ "message": "UNAUTHORIZED - 1" })
        });
    } catch (err) {
        logger.error({message: 'Erreur lors de la vérification du token : ' + err.toString()})
        res.status(403).json({ "message": "UNAUTHORIZED - 0" })
    }
}