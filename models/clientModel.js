const con = require('../db');

const Client = function (client) {
    this.name = client.name;
};
Client.createClient = function (newClient, result) {
    con.query("INSERT INTO client set ?", newClient, function (err, res) {

        if (err) {
            console.log('error:', err);
            result(err, null)
        } else {
            console.log(res.insertId);
            result(null, res.insertId);
        }

    });
};

Client.getAllClient = function (result) {
    con.query("Select * from client", function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }

    });
};
Client.getClientById = function(clientId, result) {
    con.query("Select name from client where idclient = ?", clientId, function (err, res) {
        if (err) {
            console.log("error", err);
            result(err, null);
        } else {
            result(null, res)
        }
    });
};
Client.updateById = function (id, client, result) {
    con.query("UPDATE client SET name = ? WHERE idclient = ?", [client.name, id], function (err, res) {
       if (err) {
           console.log("error:", err);
           result(err, null)
       } else {
           result(null, res);
       }
    });
};
Client.remove = function(id, result){
    con.query("DELETE FROM client WHERE idclient = ?", [id], function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{

            result(null, res);
        }
    });
};

module.exports= Client;