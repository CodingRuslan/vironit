const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/usersController');

router.get('/', user_controller.logOut);

module.exports = router;