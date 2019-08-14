const express = require('express');
const router = express.Router();
const client_controller = require('../controllers/clientsController')

/* GET home page. */
router.get('/', client_controller.index);
router.get('/create', client_controller.create_client_get);
router.post('/create', client_controller.create_client_post);

module.exports = router;