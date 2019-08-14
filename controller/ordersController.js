const express = require('express');
const async = require('async');
const con = require('../db');

exports.orderHandler = function(req, res, next) {
    if (req.length < 1) {console.log('make an order'); return}
    async.waterfall([
        function(callback) {
            let resTime = 0;
            //console.log(req.join(','));
            con.query("SELECT * FROM ingredients\n" +
                `where idingredients IN (${req.join(',')})`, (err, result) => {
                result.forEach((e) => {
                    resTime += e.timeCook;
                });
                callback(null, resTime)
            });

        },
        function (arg, callback) {
            con.query("INSERT INTO `pizzadb`.`clientOrder` (`clientId`, `cookId`, `orderDone`, `timeCooking`) " +
                `VALUES ('1', '1', '0', '${arg}');`, (err, result) => {
                //console.log(result);
                callback(null, arg);
            })
        }
    ],
    // optional callback
function(err, results) {
        setTimeout(() => {
            console.log('Order is ready');
            con.query("UPDATE `pizzadb`.`clientOrder` SET `orderDone` = '1' WHERE (`clientId` = '1');");
            res.send('1 заказ готов')
        }, results * 1000);
        console.log(results);
    });

};