const con = require('../db');

const Ingredient = function (ingredient) {
    this.name = ingredient.name;
    this.timeCook = ingredient.timeCook;
};
Ingredient.createIngredient = function (newingredient, result) {
    con.query("INSERT INTO ingredients set ?", newingredient, function (err, res) {

        if (err) {
            console.log('error:', err);
            result(err, null)
        } else {
            console.log(res.insertId);
            result(null, res.insertId);
        }

    });
};

Ingredient.getAllIngredient = function (result) {
    con.query("Select * from ingredients", function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }

    });
};
Ingredient.getIngredientById = function(ingredientId, result) {
    con.query("Select * from ingredients where idingredients = ?", ingredientId, function (err, res) {
        if (err) {
            console.log("error", err);
            result(err, null);
        } else {
            result(null, res)
        }
    });
};
Ingredient.updateById = function (id, ingredient, result) {
    con.query("UPDATE ingredients SET `name` = ?, `timeCook` = ? WHERE idingredients = ?",
        [ingredient.name, ingredient.timeCook, id], function (err, res) {
            if (err) {
                console.log("error:", err);
                result(err, null)
            } else {
                result(null, res);
            }
        });
};
Ingredient.remove = function(id, result){
    con.query("DELETE FROM ingredients WHERE idingredients = ?", [id], function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{

            result(null, res);
        }
    });
};

module.exports= Ingredient;