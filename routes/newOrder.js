const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const ordersController = require('../controller/ordersController');
const urlencodedParser = bodyParser.urlencoded({extend: false});

router
    .get('/', function(req, res, next) {
        res.render('createOrder', { title: 'order', message: 'Menu'});
    })
    .post('/', urlencodedParser, function (req, res, next) {
        ordersController.orderHandler(Object.keys(req.body), res);
    });

module.exports = router;