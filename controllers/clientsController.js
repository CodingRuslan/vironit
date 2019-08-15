const Client = require('../models/clientModel');

exports.index = function(req, res) {
    Client.getAllClient(function (err, client) {

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

    if (!new_client.name) {
        res.status(400).send({error:true, message: 'Please add name'})
    } else {

        Client.createClient(new_client, function (err, client) {

            if (err){res.send(err)}
            // res.json(client);
            res.render('clientCreate', { title: 'clientsCreate', message: `Клиент ${req.body.name} добавлен. Добавление клиента в базу`} );
        });
    }
};

exports.read_a_client = function(req, res) {
    Client.getClientById(req.params.clientId, function(err, client) {
        if (err)
            res.send(err);
        // res.send(client[0].name);
        res.render('clientOptions', {title: 'clientInfo', message: "Инфо клиента", id:req.params.clientId, name: `${client[0].name}`})
    });
};

exports.update_client_get = function (req, res) {
    res.render('clientUpdate', {title: 'clientUpdate', message: "Обновление клиента", id:req.params.clientId})
};

exports.update_client_post = function (req, res) {
    console.log('req.params.clientId', req.params.clientId);
    Client.updateById(req.params.clientId, new Client(req.body), function(err, client) {
        if (err)
            res.send(err);
        res.render('clientUpdate', {title: 'clientUpdate', message: `Клиент ${req.params.clientId} обновлен. Обновление клиента`, id:req.params.clientId})
    });
};

exports.delete_client_get = function (req, res) {
    res.render('clientDelete', {title: 'clientDelete', message: "Удалить клиента", id:req.params.clientId, flag:true})
};

exports.delete_client_post = function (req, res) {

    Client.remove( req.params.clientId, function(err, client) {
        if (err)
            res.send(err);
        res.render('clientDelete', {title: 'clientDelete', message: "Удалить клиента", id:req.params.clientId, flag: false})
    });
};