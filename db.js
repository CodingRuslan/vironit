const mysql = require('mysql');
const async = require('async');

//local mysql db connection
const con = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : 'root',
    database : 'pizzadb'
});

con.connect(function(err) {
    if (err) throw err;
    console.log("the base is connected");
    async.series([
        function(callback) {
            con.query("CREATE DATABASE IF NOT EXISTS  pizzadb", function (err) {
                if (err) throw err;
            });
        },
        function(callback) {
            con.query("CREATE TABLE IF NOT EXISTS `pizzadb`.`client` (\n" +
                "  `idclient` INT NOT NULL AUTO_INCREMENT,\n" +
                "  `name` VARCHAR(45) NULL,\n" +
                "  PRIMARY KEY (`idclient`));", function (err) {
                    if (err) throw(err)
            })
        },
        function() {
            con.query("CREATE TABLE IF NOT EXISTS `pizzadb`.`cook` (\n" +
                " `idcook` int(11) NOT NULL AUTO_INCREMENT,\n" +
                " `name` varchar(45) DEFAULT NULL,\n" +
                " `isFree` tinyint(1) DEFAULT NULL,\n" +
                "  PRIMARY KEY (`idcook`));", function (err) {
                if (err) throw(err)
            })
        },
        function() {
            con.query("CREATE TABLE IF NOT EXISTS `pizzadb`.`ingredients` (\n" +
                " `idingredients` INT NOT NULL AUTO_INCREMENT,\n" +
                " `name` VARCHAR(45) NULL,\n" +
                " `timeCook` INT NULL,\n" +
                "  PRIMARY KEY (`idingredients`));", function (err) {
                if (err) throw(err)
            })
        },
        function() {
            con.query("CREATE TABLE IF NOT EXISTS `pizzadb`.`clientOrder` (\n" +
                " `idclientOrder` INT NOT NULL AUTO_INCREMENT,\n" +
                " `clientId` INT NULL,\n" +
                " `cookId` INT NULL,\n" +
                " `orderDone` BOOLEAN NULL,\n" +
                " `timeCoking` VARCHAR(45) NULL,\n" +
                "  PRIMARY KEY (`idclientOrder`));", function (err) {
                if (err) throw(err)
            })
        },
        function() {
            con.query("CREATE TABLE IF NOT EXISTS `pizzadb`.`clientIngredients` (\n" +
                " `idclientIngredients` INT NOT NULL AUTO_INCREMENT,\n" +
                " `clientId` INT NULL,\n" +
                " `ingredientId` INT NULL DEFAULT NULL\n" +
                "  PRIMARY KEY (`idclientIngredients`));", function (err) {
                if (err) throw(err)
            })
        },
        function() {
            con.query("ALTER TABLE `pizzadb`.`clientOrder` \n" +
                "ADD INDEX `fk_client_idx` (`clientId` ASC);\n" +
                ";\n" +
                "ALTER TABLE `pizzadb`.`clientOrder` \n" +
                "ADD CONSTRAINT `fk_client`\n" +
                "  FOREIGN KEY (`clientId`)\n" +
                "  REFERENCES `pizzadb`.`client` (`idclient`)\n" +
                "  ON DELETE NO ACTION\n" +
                "  ON UPDATE NO ACTION;", function (err) {
                if (err) throw(err)
            })
        },
        function() {
            con.query("ALTER TABLE `pizzadb`.`clientOrder` \n" +
                "ADD INDEX `fk_cook_idx` (`cookId` ASC);\n" +
                ";\n" +
                "ALTER TABLE `pizzadb`.`clientOrder` \n" +
                "ADD CONSTRAINT `fk_cook`\n" +
                "  FOREIGN KEY (`cookId`)\n" +
                "  REFERENCES `pizzadb`.`cook` (`idcook`)\n" +
                "  ON DELETE NO ACTION\n" +
                "  ON UPDATE NO ACTION;", function (err) {
                if (err) throw(err)
            })
        },
        function() {
            con.query("ALTER TABLE `pizzadb`.`clientIngredients` \n" +
                "ADD CONSTRAINT `fk_clientIngredients`\n" +
                "  FOREIGN KEY (`ingredientId`)\n" +
                "  REFERENCES `pizzadb`.`ingredients` (`idingredients`)\n" +
                "  ON DELETE NO ACTION\n" +
                "  ON UPDATE NO ACTION;\n", function (err) {
                if (err) throw(err)
            })
        },
        function() {
            con.query("ALTER TABLE `pizzadb`.`clientOrder` \n" +
                "ADD CONSTRAINT `fk_clientOrder`\n" +
                "  FOREIGN KEY (`clientId`)\n" +
                "  REFERENCES `pizzadb`.`clientIngredients` (`clientId`)\n" +
                "  ON DELETE NO ACTION\n" +
                "  ON UPDATE NO ACTION;", function (err) {
                if (err) throw(err)
            })
        },
        function () {
            con.query(
                "INSERT IGNORE INTO `pizzadb`.`ingredients` (`idingredients`, `name`, `timeCook`) VALUES ('1','base', '5');\n" +
                "INSERT IGNORE INTO `pizzadb`.`ingredients` (`idingredients`, `name`, `timeCook`) VALUES ('2', 'chicken', '4');\n" +
                "INSERT IGNORE INTO `pizzadb`.`ingredients` (`idingredients`, `name`, `timeCook`) VALUES ('3', 'pepperoni', '3');\n" +
                "INSERT IGNORE INTO `pizzadb`.`ingredients` (`idingredients`, `name`, `timeCook`) VALUES ('4', 'pineapple', '2');\n" +
                "INSERT IGNORE INTO `pizzadb`.`ingredients` (`idingredients`, `name`, `timeCook`) VALUES ('5', 'cheese', '1');\n" +
                "INSERT IGNORE INTO `pizzadb`.`ingredients` (`idingredients`, `name`, `timeCook`) VALUES ('6', 'ham', '3');\n" +
                "INSERT IGNORE INTO `pizzadb`.`ingredients` (`idingredients`, `name`, `timeCook`) VALUES ('7', 'shrimp', '2');\n" +
                "INSERT IGNORE INTO `pizzadb`.`ingredients` (`idingredients`, `name`, `timeCook`) VALUES ('8', 'mushrooms', '2');\n" +
                "INSERT IGNORE INTO `pizzadb`.`ingredients` (`idingredients`, `name`, `timeCook`) VALUES ('9', 'pepper', '1');\n" +
                "INSERT IGNORE INTO `pizzadb`.`ingredients` (`idingredients`, `name`, `timeCook`) VALUES ('10', 'olives', '1');\n" +
                "INSERT IGNORE INTO `pizzadb`.`ingredients` (`idingredients`, `name`, `timeCook`) VALUES ('11', 'tomatoes', '2');" +
                "", function (err, res) {
                    if (err) throw (err);
                    console.log(res)
                })
        },
        function () {
            con.query("TRUNCATE TABLE clientOrder;", function (err, res) {
                if (err) throw (err);
                console.log(err, res);
            });
        }
    ]);

});

module.exports = con;