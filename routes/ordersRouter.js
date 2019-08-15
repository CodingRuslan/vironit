const express = require('express');
const router = express.Router();
const order_controller = require('../controllers/ordersController');

/* GET home page. */
router.get('/', order_controller.index);

router.get('/create', order_controller.create_order_get);
router.post('/create', order_controller.create_order_post);

router.get('/:idclientOrder', order_controller.read_a_order);

router.get('/:idclientOrder/update', order_controller.update_order_get);
router.post('/:idclientOrder/update', order_controller.update_order_post);

router.get('/:idclientOrder/delete', order_controller.delete_order_get);
router.post('/:idclientOrder/delete', order_controller.delete_order_post);

module.exports = router;