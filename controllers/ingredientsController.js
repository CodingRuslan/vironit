const Ingredient = require('../models/ingredientModel');

exports.index = function(req, res) {
    Ingredient.getAllIngredient(function (err, ingredient) {

        if (err) {
            res.send(err);
            console.log('res', ingredient);
        }
        res.render('ingredients', { title: 'ingredients', message: 'All ingredients:', val: ingredient} );
    });

};

exports.create_ingredient_get = function(req, res) {
    res.render('ingredientCreate', { title: 'ingredientsCreate', message: 'Добавление ингредиента в базу'} );
};

exports.create_ingredient_post = function(req, res) {
    const new_ingredient = new Ingredient(req.body);

    if (!new_ingredient) {
        res.status(400).send({error:true, message: 'Please add name'})
    } else {

        Ingredient.createIngredient(new_ingredient, function (err, ingredient) {

            if (err){res.send(err)}
            // res.json(ingredient);
            res.render('ingredientCreate', { title: 'ingredientsCreate', message: `ингредиент добавлен. Добавление ингредиента в базу`} );
        });
    }
};

exports.read_a_ingredient = function(req, res) {
    Ingredient.getIngredientById(req.params.idingredients, function(err, ingredient) {
        if (err)
            res.send(err);
        // res.json(ingredient);
        res.render('ingredientOptions', {title: 'ingredientInfo', message: "Инфо ингредиента", id:req.params.idingredients, info: ingredient})
    });
};

exports.update_ingredient_get = function (req, res) {
    res.render('ingredientUpdate', {title: 'ingredientUpdate', message: "Обновление ингредиента", id:req.params.idingredients})
};

exports.update_ingredient_post = function (req, res) {
    console.log(req.params);
    Ingredient.updateById(req.params.idingredients, new Ingredient(req.body), function(err, ingredient) {
        if (err)
            res.send(err);
        res.render('ingredientUpdate', {title: 'ingredientUpdate', message: `ингредиент ${req.params.idingredients} обновлен. Обновление ингредиента`, id:req.params.idingredients})
    });
};

exports.delete_ingredient_get = function (req, res) {
    res.render('ingredientDelete', {title: 'ingredientDelete', message: "Удалить ингредиент", id:req.params.idingredients, flag:true})
};

exports.delete_ingredient_post = function (req, res) {

    Ingredient.remove( req.params.idingredients, function(err, ingredient) {
        if (err)
            res.send(err);
        res.render('ingredientDelete', {title: 'ingredientDelete', message: "Удален ингредиент", id:req.params.idingredients, flag: false})
    });
};