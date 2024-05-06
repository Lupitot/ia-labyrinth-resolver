const Obstacle = require('../models/obstacles');
const logger = require('../logger');
console.log('test4');
exports.createObstacle = (req, res) => {
    let obstacles = new Obstacle({
        name: req.body.name,
        traversable: req.body.traversable,
        effect: req.body.effect,
        appearance: req.body.appearance,
        min: req.body.min,
        max: req.body.max,
        creationDate: new Date(),
        modificationDate: new Date(),
        active: true
    });
    console.log(obstacles);
    obstacles.save().then((savedObstacles) => {
        console.log(savedObstacles);
        res.status(200).json({ "message": "Création d'un obstacl bien réalisée", "obstacle": savedObstacles });
        logger.info({ message: savedObstacles.name + ' bien créé'});
    }).catch((err) => {
        logger.error({ message: 'Erreur à la création de l obstacle'});
        res.status(405).json({ "message": "Erreur lors de la création de l obstacle, vérifier le body", "err": err });
    });
}

exports.getObstacle = (req, res) => {
    console.log('test');
    const id = req.params.id;

    Obstacle.findById(id).then((obstacle) => {
        logger.info({ message: obstacle.name + ' bien renvoyé'});
        res.status(200).json(obstacle);
    }).catch((err) => {
        logger.error({ message: id + ' introuvable'});
        res.status(404).json({ "message": "Pas d obstacle trouvé pour cet id", "err": err });
    });
}

exports.updateObstacle = (req, res) => {
    const id = req.params.id;

    req.body.modificationDate = new Date();
    Obstacle.updateOne({ _id: id }, req.body).then((updatedObstacle) => {
        if (updatedObstacle) {
            logger.info({ message: id + ' bien mis à jour'});
            res.status(200).json({ "message": "Modification de l obstacle bien réalisée", "obstacle": updatedObstacle });
        } else {
            logger.error({ message: id + ' introuvable (modification)'});
            res.status(405).json({ "message": "Erreur lors de la modification de l obstacle, vérifier le body", "err": err });
        }
    }).catch((err) => {
        logger.error({ message: 'Erreur lors de la modification de ' + id});
        res.status(405).json({ "message": "Erreur lors de la modification de l obstacle, vérifier l'id'", "err": err });
    });
}

exports.deleteObstacle = (req, res) => {
    const id = req.params.id;

    Obstacle.findByIdAndDelete(id).then((result) => {
        if (result) {
            logger.info({ message: id + ' bien supprimé'});
            res.status(200).json({ "message": "Suppression de l obstacle bien réalisée" });
        } else {
            logger.error({ message: 'Erreur lors de la suppression de  ' + id});
            res.status(404).json({ "message": "Cet obstacle n'existe pas" });
        }
    }).catch((err) => {
        res.status(404).json({ "message": "Erreur lors de la suppression de l obstacle", "err": err });
    });
}

exports.getObstacleList = (req, res) => {
    Obstacle.find().then((ObstacleDList) => {
        logger.info({ message: 'Liste d Obstacle bien retournée'});
        res.status(200).json(ObstacleDList);
    }).catch((err) => {
        logger.error({ message: 'Pas de résultat pour la liste d Obstacle'});
        res.status(404).json({ "message": "Pas d Obstacle", "err": err });
    });
}