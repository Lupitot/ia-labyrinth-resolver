const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');




exports.createUser = (req, res) => {
    console.log("l'utilisateur est crée ?",req.body);
    bcrypt.hash(req.body.password, 10)
        .then((hash) => {
            let user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hash,
                status : "user",
                creationDate: new Date(),
                modificationDate: new Date(),
                active: true
            });


            user.save().then((savedUser) => {
                if(savedUser){
                    const token = jwt.sign({id: user.id, user: user }, 'RANDOM_TOKEN_SECRET', { expiresIn: '24h' });
                    console.log("id user apres creation token", user.id, "l'autre possible id", user._id)
                    console.log("token", token)
                    res.status(200).json({ message: "Création de User bien réalisée", user: savedUser, token: token, email: user.email, name: user.name, idUser: user._id});
                }
            }).catch((err) => {
                res.status(405).json({ "message": "Erreur lors de la création de User, vérifier le body", "err": err });
            });
        }).catch((err) => {
            res.status(500).json({ "message": "Erreur lors du chiffrement, vérifier le body", "err": err });
        })
}

exports.login = (req, res) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            bcrypt.compare(req.body.password, user.password)
                .then((valid) => {
                    if (valid) {
                        const token = jwt.sign({id: user.id, user: user }, 'RANDOM_TOKEN_SECRET', { expiresIn: '24h' });
                        console.log("id user apres creation token du login", user.id)
                        console.log("token", token)
                        res.status(200).json({ token: token, email: user.email, name: user.name, idUser: user._id});
                    } else {
                        res.status(401).json({ "message": "Bad credentials" });
                    }
                })
                .catch((err) => {
                    res.status(500).json({ "message": "Error with bcrypt ", "err": err });
                })


        }).catch(() => {
            res.status(404).json({ "message": "User not found" });
        })
}

exports.getUser = (req, res) => {
    const id = req.params.id;

    User.findById(id).then((user) => {
        res.status(200).json(user);
    }).catch((err) => {
        res.status(404).json({ "message": "Pas de User trouvé pour cet id", "err": err });
    });
}

exports.updateUser = (req, res) => {
    const id = req.params.id;
    console.log('id dans le back',id)
    console.log('donnée dans le req body',req.body)
    req.body.modificationDate = new Date();
    User.findOneAndUpdate({ _id: id }, req.body, { new: true, runValidators: true, context: 'query' }).then((updatedUser) => {
        console.log('update user depuis le back',updatedUser);
        res.status(200).json({ "message": "Modification de User bien réalisée", "user": updatedUser });
    }).catch((err) => {
        res.status(405).json({ "message": "Erreur lors de la modification de User, vérifier le body", "err": err });
    });
}

exports.deleteUser = (req, res) => {
    const id = req.params.id;

    User.findByIdAndDelete(id).then((result) => {
        if (result) {
            res.status(200).json({ "message": "Suppression de User bien réalisée" });
        } else {
            res.status(404).json({ "message": "Ce user n'existe pas" });
        }
    }).catch((err) => {
        res.status(404).json({ "message": "Erreur lors de la suppression de User", "err": err });
    });
}

