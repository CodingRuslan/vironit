const Order = require('../models/orderModel');

exports.index = function(req, res) {
    Order.getAllOrder(function (err, order) {

        if (err) {
            res.send(err);
            console.log('res', order);
        }
        res.render('orders', { title: 'orders', message: 'All orders:', val: order} );
    });

};

exports.create_order_get = function(req, res) {
    res.render('orderCreate', { title: 'ordersCreate', message: 'Добавление заказа в базу'} );
};

exports.create_order_post = function(req, res) {
    const new_order = new Order(req.body);

    if (!new_order) {
        res.status(400).send({error:true, message: 'Please add name'})
    } else {

        Order.createOrder(new_order, function (err, order) {

            if (err){res.send(err)}
            // res.json(order);
            res.render('orderCreate', { title: 'ordersCreate', message: `Заказ добавлен. Добавление заказа в базу`} );
        });
    }
};

exports.read_a_order = function(req, res) {
    console.log(req.params)
    Order.getOrderById(req.params.idclientOrder, function(err, order) {
        if (err)
            res.send(err);
        // res.json(order);
        res.render('orderOptions', {title: 'orderInfo', message: "Инфо заказа", id:req.params.idclientOrder, info: order})
    });
};

exports.update_order_get = function (req, res) {
    res.render('orderUpdate', {title: 'orderUpdate', message: "Обновление заказа", id:req.params.idclientOrder})
};

exports.update_order_post = function (req, res) {
    console.log('req.params.orderId', req.params.orderId);
    Order.updateById(req.params.idclientOrder, new Order(req.body), function(err, order) {
        if (err)
            res.send(err);
        res.render('orderUpdate', {title: 'orderUpdate', message: `заказ ${req.params.idclientOrder} обновлен. Обновление заказа`, id:req.params.idclientOrder})
    });
};

exports.delete_order_get = function (req, res) {
    res.render('orderDelete', {title: 'orderDelete', message: "Удалить заказ", id:req.params.idclientOrder, flag:true})
};

exports.delete_order_post = function (req, res) {

    Order.remove( req.params.idclientOrder, function(err, order) {
        if (err)
            res.send(err);
        res.render('orderDelete', {title: 'orderDelete', message: "Удален заказ", id:req.params.idclientOrder, flag: false})
    });
};