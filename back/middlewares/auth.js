const jwt = require('jsonwebtoken');
const User = require('../models/user');
const logger = require('../logger');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const decodeToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');

        const userEmail = decodeToken.user ? decodeToken.user.email : decodeToken.email;

        User.findOne({ email: userEmail }).then((user) => {
            logger.info({message: user.name + ' fait une requête'});
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