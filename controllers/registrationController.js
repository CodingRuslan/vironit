const User = require('../models/userModel');
const crypto = require('crypto');
const async = require('async');

exports.create_user_get = function(req, res) {
    res.render('registration', { title: 'registration', message: 'Регистрация'});
};

exports.create_user_post = function(req, res) {
    async.waterfall([
        function(callback) {
            User.getUserByLogin(req.body.login, function (err, res) {
                if (err){res.send(err)}
                callback(null, res);
            });
        }
    ], function (err, result) {
        if (result.length > 0) {
            res.render('registration', { title: 'registration', message: `Пользователь с таким именем уже существует`} );
        } else {
            req.body.password = crypto.createHash('sha256').update(req.body.password).digest('hex');
            const new_user = new User(req.body);

            if (!new_user) {
                res.status(400).send({error:true, message: 'Please add name'})
            } else {

                User.createUser(new_user, function (err, user) {

                    if (err){res.send(err)}
                    // res.json(user);
                    res.render('registration', { title: 'registration', message: `Вы зарегистрированы`} );
                });
            }
        }
    });
};