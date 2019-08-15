const Cook = require('../models/cookModel');

exports.index = function(req, res) {
    Cook.getAllCook(function (err, cook) {

        if (err) {
            res.send(err);
            console.log('res', cook);
        }
        res.render('cooks', { title: 'cooks', message: 'All cooks:', val: cook} );
        // res.json(cook);
        // res.send(cook)
    });

};

exports.create_cook_get = function(req, res) {
    res.render('cookCreate', { title: 'cooksCreate', message: 'Добавление повара в базу'} );
};

exports.create_cook_post = function(req, res) {
    const new_cook = new Cook(req.body);

    if (!new_cook.name) {
        res.status(400).send({error:true, message: 'Please add name'})
    } else {

        Cook.createCook(new_cook, function (err, cook) {

            if (err){res.send(err)}
            // res.json(cook);
            res.render('cookCreate', { title: 'cooksCreate', message: `Повар ${req.body.name} добавлен. Добавление повара в базу`} );
        });
    }
};

exports.read_a_cook = function(req, res) {
    Cook.getCookById(req.params.cookId, function(err, cook) {
        if (err)
            res.send(err);
        // res.json(cook);
        res.render('cookOptions', {title: 'cookInfo', message: "Инфо повара", id:req.params.cookId, info: cook})
    });
};

exports.update_cook_get = function (req, res) {
    res.render('cookUpdate', {title: 'cookUpdate', message: "Обновление повара", id:req.params.cookId})
};

exports.update_cook_post = function (req, res) {
    console.log('req.params.cookId', req.params.cookId);
    Cook.updateById(req.params.cookId, new Cook(req.body), function(err, cook) {
        if (err)
            res.send(err);
        res.render('cookUpdate', {title: 'cookUpdate', message: `повар ${req.params.cookId} обновлен. Обновление повара`, id:req.params.cookId})
    });
};

exports.delete_cook_get = function (req, res) {
    res.render('cookDelete', {title: 'cookDelete', message: "Удалить повара", id:req.params.cookId, flag:true})
};

exports.delete_cook_post = function (req, res) {

    Cook.remove( req.params.cookId, function(err, cook) {
        if (err)
            res.send(err);
        res.render('cookDelete', {title: 'cookDelete', message: "Удален повар", id:req.params.cookId, flag: false})
    });
};