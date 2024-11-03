const express = require('express');
const router = express.Router();
const controller = require('../controller/controller');
const { auth } = require('../middleware/auth');

router.post('/users', controller.register);
router.post('/users/login', controller.login);

module.exports = router;
