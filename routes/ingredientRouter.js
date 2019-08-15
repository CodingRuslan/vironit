const express = require('express');
const router = express.Router();
const ingredient_controller = require('../controllers/ingredientsController');

/* GET home page. */
router.get('/', ingredient_controller.index);

router.get('/create', ingredient_controller.create_ingredient_get);
router.post('/create', ingredient_controller.create_ingredient_post);

router.get('/:idingredients', ingredient_controller.read_a_ingredient);

router.get('/:idingredients/update', ingredient_controller.update_ingredient_get);
router.post('/:idingredients/update', ingredient_controller.update_ingredient_post);

router.get('/:idingredients/delete', ingredient_controller.delete_ingredient_get);
router.post('/:idingredients/delete', ingredient_controller.delete_ingredient_post);

module.exports = router;