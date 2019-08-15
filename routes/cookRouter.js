const express = require('express');
const router = express.Router();
const cook_controller = require('../controllers/cooksController');

/* GET home page. */
router.get('/', cook_controller.index);

router.get('/create', cook_controller.create_cook_get);
router.post('/create', cook_controller.create_cook_post);

router.get('/:cookId', cook_controller.read_a_cook);

router.get('/:cookId/update', cook_controller.update_cook_get);
router.post('/:cookId/update', cook_controller.update_cook_post);

router.get('/:cookId/delete', cook_controller.delete_cook_get);
router.post('/:cookId/delete', cook_controller.delete_cook_post);

module.exports = router;