const con = require('../db');

const Order = function (order) {
    this.clientId = order.clientId;
    this.cookId = order.cookId;
    this.orderDone = order.orderDone;
    this.timeCooking = order.timeCooking;
};
Order.createOrder = function (neworder, result) {
    con.query("INSERT INTO clientOrder set ?", neworder, function (err, res) {

        if (err) {
            console.log('error:', err);
            result(err, null)
        } else {
            console.log(res.insertId);
            result(null, res.insertId);
        }

    });
};

Order.getAllOrder = function (result) {
    con.query("Select * from clientOrder", function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }

    });
};
Order.getOrderById = function(orderId, result) {
    con.query("Select * from clientOrder where idclientOrder = ?", orderId, function (err, res) {
        if (err) {
            console.log("error", err);
            result(err, null);
        } else {
            result(null, res)
        }
    });
};
Order.updateById = function (id, order, result) {
    con.query("UPDATE clientOrder SET `clientId` = ?, `cookId` = ?, `orderDone` = ?, `timeCooking` = ? WHERE idclientOrder = ?",
        [order.clientId, order.cookId, order.orderDone, order.timeCooking, id], function (err, res) {
        if (err) {
            console.log("error:", err);
            result(err, null)
        } else {
            result(null, res);
        }
    });
};
Order.remove = function(id, result){
    con.query("DELETE FROM clientOrder WHERE idclientOrder = ?", [id], function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{

            result(null, res);
        }
    });
};

module.exports= Order;