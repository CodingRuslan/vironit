const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/registrationController');

router.get('/', user_controller.create_user_get);
router.post('/', user_controller.create_user_post);

// router.get('/create', user_controller.create_user_get);
// router.post('/create', user_controller.create_user_post);
//
// router.get('/:userId', user_controller.read_a_user);
//
// router.get('/:userId/update', user_controller.update_user_get);
// router.post('/:userId/update', user_controller.update_user_post);
//
// router.get('/:userId/delete', user_controller.delete_user_get);
// router.post('/:userId/delete', user_controller.delete_user_post);

module.exports = router;