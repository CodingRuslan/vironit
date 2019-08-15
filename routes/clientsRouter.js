const express = require('express');
const router = express.Router();
const client_controller = require('../controllers/clientsController');

/* GET home page. */
router.get('/', client_controller.index);

router.get('/create', client_controller.create_client_get);
router.post('/create', client_controller.create_client_post);

router.get('/:clientId', client_controller.read_a_client);

router.get('/:clientId/update', client_controller.update_client_get);
router.post('/:clientId/update', client_controller.update_client_post);

router.get('/:clientId/delete', client_controller.delete_client_get);
router.post('/:clientId/delete', client_controller.delete_client_post);

module.exports = router;