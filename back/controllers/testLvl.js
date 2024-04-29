const TestLvl = require('../models/testLvl');
const logger = require('../logger');
console.log('test4');

exports.createTestLvl = (req, res) => {
    let testLvl = new TestLvl({
        name_level: req.body.name_level,
        passage_date: req.body.passage_date,
        result: req.body.result,
        creationDate: new Date(),
        modificationDate: new Date(),
        creationUser: 'admin',
        modificationUser: 'admin',
        active: true
    });
    
    testLvl.save().then((savedTestLvl) => {
        res.status(200).json({ "message": "Création d'un test bien réalisée", "testLvl": savedTestLvl });
        logger.info({ message: savedTestLvl.name_level + ' bien créé'});
    }).catch((err) => {
        logger.error({ message: 'Erreur à la création du test'});
        res.status(405).json({ "message": "Erreur lors de la création du test , vérifier le body", "err": err });
    });
}

exports.getTestLvl = (req, res) => {
    console.log('test');
    const id = req.params.id;

    TestLvl.findById(id).then((testLvl) => {
        logger.info({ message: testLvl.name_level + ' bien renvoyé'});
        res.status(200).json(testLvl);
    }).catch((err) => {
        logger.error({ message: id + ' introuvable'});
        res.status(404).json({ "message": "Pas de test trouvé pour cet id", "err": err });
    });
}

exports.updateTestLvl = (req, res) => {
    const id = req.params.id;

    req.body.modificationDate = new Date();
    TestLvl.updateOne({ _id: id }, req.body).then((updatedTestLvl) => {
        if (updatedTestLvl) {
            logger.info({ message: id + ' bien mis à jour'});
            res.status(200).json({ "message": "Modification du test bien réalisée", "TestLvl": updatedTestLvl });
        } else {
            logger.error({ message: id + ' introuvable (modification)'});
            res.status(405).json({ "message": "Erreur lors de la modification du test, vérifier le body", "err": err });
        }
    }).catch((err) => {
        logger.error({ message: 'Erreur lors de la modification de ' + id});
        res.status(405).json({ "message": "Erreur lors de la modification du test, vérifier l'id'", "err": err });
    });
}

exports.deleteTestLvl = (req, res) => {
    const id = req.params.id;

    TestLvl.findByIdAndDelete(id).then((result) => {
        if (result) {
            logger.info({ message: id + ' bien supprimé'});
            res.status(200).json({ "message": "Suppression du test bien réalisée" });
        } else {
            logger.error({ message: 'Erreur lors de la suppression de  ' + id});
            res.status(404).json({ "message": "Ce test n'existe pas" });
        }
    }).catch((err) => {
        res.status(404).json({ "message": "Erreur lors de la suppression du test", "err": err });
    });
}

exports.getTestLvlList = (req, res) => {
    TestLvl.find().then((TestLvlList) => {
        logger.info({ message: 'Liste de test bien retournée'});
        res.status(200).json(TestLvlList);
    }).catch((err) => {
        logger.error({ message: 'Pas de résultat pour la liste de test'});
        res.status(404).json({ "message": "Pas de test", "err": err });
    });
}