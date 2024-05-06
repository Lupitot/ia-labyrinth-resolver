const Level = require('../models/level');
const logger = require('../logger');
console.log('test4');

exports.createLevel = (req, res) => {
    if(!req.isAdmin){
        logger.error({ message: 'Création de level non autorisée'});
        res.status(403).json({ "message": "UNAUTHORIZED" });
        return;
    }
    let level = new Level({
        name: req.body.name,
        creator: req.body.creator,
        composition: req.body.composition,
        creationDate: new Date(),
        modificationDate: new Date(),
        active: true
    });
    level.save().then((savedLevel) => {
        res.status(200).json({ "message": "Création du level bien réalisée", "level": savedLevel});
        logger.info({ message: savedLevel.name + ' bien créé'});
    }).catch((err) => {
        logger.error({ message: 'Erreur à la création du level'});
        res.status(405).json({ "message": "Erreur lors de la création du level , vérifier le body", "err": err });
    });
}

exports.getLevel= (req, res) => {
    console.log('test');
    const id = req.params.id;

    Level.findById(id).then((level) => {
        logger.info({ message: level.name + ' bien renvoyé'});
        res.status(200).json(level);
    }).catch((err) => {
        logger.error({ message: id + ' introuvable'});
        res.status(404).json({ "message": "Pas de level trouvé pour cet id", "err": err });
    });
}

exports.updateLevel = (req, res) => {
    const id = req.params.id;

    req.body.modificationDate = new Date();
    Level.updateOne({ _id: id }, req.body).then((updatedLevel) => {
        if (updatedLevel) {
            logger.info({ message: id + ' bien mis à jour'});
            res.status(200).json({ "message": "Modification du level bien réalisée", "level": updatedLevel });
        } else {
            logger.error({ message: id + ' introuvable (modification)'});
            res.status(405).json({ "message": "Erreur lors de la modification du level, vérifier le body", "err": err });
        }
    }).catch((err) => {
        logger.error({ message: 'Erreur lors de la modification de ' + id});
        res.status(405).json({ "message": "Erreur lors de la modification du level, vérifier l'id'", "err": err });
    });
}

exports.deleteLevel = (req, res) => {
    const id = req.params.id;

    Level.findByIdAndDelete(id).then((result) => {
        if (result) {
            logger.info({ message: id + ' bien supprimé'});
            res.status(200).json({ "message": "Suppression du level bien réalisée" });
        } else {
            logger.error({ message: 'Erreur lors de la suppression de  ' + id});
            res.status(404).json({ "message": "Ce level n'existe pas" });
        }
    }).catch((err) => {
        res.status(404).json({ "message": "Erreur lors de la suppression du level", "err": err });
    });
}

exports.getLevelList = (req, res) => {
    Level.find().then((LevelList) => {
        logger.info({ message: 'Liste de level bien retournée'});
        res.status(200).json(LevelList);
    }).catch((err) => {
        logger.error({ message: 'Pas de résultat pour la liste de level'});
        res.status(404).json({ "message": "Pas de level", "err": err });
    });
}