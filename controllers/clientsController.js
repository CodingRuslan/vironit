const Client = require('../models/clientModel');
const async = require('async');

exports.index = function(req, res) {
    Client.getAllClient(function (err, client) {

        console.log('controller');
        if (err) {
            res.send(err);
            console.log('res', client);
        }
        res.render('clients', { title: 'clients', message: 'All clients:', val: client} );
    });

};

exports.create_client_get = function(req, res) {
    res.render('clientCreate', { title: 'clientsCreate', message: 'Добавление клиента в базу'} );
};

exports.create_client_post = function(req, res) {
    const new_client = new Client(req.body);
    console.log(new_client);

    if (!new_client.name) {
        res.status(400).send({error:true, message: 'Please add name'})
    } else {

        Client.createClient(new_client, function (err, client) {

            if (err){res.send(err)}
            res.json(client);

        });
    }

    // res.render('clientCreate', { title: 'clientsCreate', message: 'Тут будет создание клиента'} );
};