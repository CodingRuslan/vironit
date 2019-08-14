const con = require('../db');

const Client = function (client) {
    this.name = client.name;
};
Client.getAllClient = function (result) {
    con.query("Select * from client", function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('tasks : ', res);

            result(null, res);
        }

    });
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

module.exports= Client;