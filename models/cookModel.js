const con = require('../db');

const Cook = function (cook) {
    this.name = cook.name;
    this.isFree = cook.isFree;
};
Cook.createCook = function (newcook, result) {
    con.query("INSERT INTO cook set ?", newcook, function (err, res) {

        if (err) {
            console.log('error:', err);
            result(err, null)
        } else {
            console.log(res.insertId);
            result(null, res.insertId);
        }

    });
};

Cook.getAllCook = function (result) {
    con.query("Select * from cook", function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }

    });
};
Cook.getCookById = function(cookId, result) {
    con.query("Select name, isFree from cook where idcook = ?", cookId, function (err, res) {
        if (err) {
            console.log("error", err);
            result(err, null);
        } else {
            result(null, res)
        }
    });
};
Cook.updateById = function (id, cook, result) {
    con.query("UPDATE cook SET name = ?, isFree = ? WHERE idcook = ?", [cook.name, cook.isFree, id], function (err, res) {
        if (err) {
            console.log("error:", err);
            result(err, null)
        } else {
            result(null, res);
        }
    });
};
Cook.remove = function(id, result){
    con.query("DELETE FROM cook WHERE idcook = ?", [id], function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{

            result(null, res);
        }
    });
};

module.exports= Cook;