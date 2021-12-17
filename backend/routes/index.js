const express = require('express');
const router = express();

const loginController = require('../controllers/LoginController');
router.post('/login', loginController.login);
module.exports = router;
