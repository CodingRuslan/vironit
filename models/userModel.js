const con = require('../db');
const uuid = require('uuidv4');

const User = function (user) {
    this.login = user.login;
    this.pass = user.password;
    this.token = uuid();
};
User.createUser = function (newuser, result) {
    con.query("INSERT INTO users set ?", newuser, function (err, res) {

        if (err) {
            console.log('error:', err);
            result(err, null)
        } else {
            console.log(res.insertId);
            result(null, res.insertId);
        }

    });
};
User.getUserByLogin = function(login, result) {
    con.query("Select * from users where login = ?", login, function (err, res) {
        if (err) {
            console.log("error", err);
            result(err, null);
        } else {
            result(null, res)
        }
    });
};

module.exports= User;