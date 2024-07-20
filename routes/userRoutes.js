const express = require('express');
const router = express.Router();
const { signup, login, getUserData, borrowMoney } = require('../userController');
const auth = require('../auth');

router.post('/signup', signup);

router.post('/login', login);

router.get('/user', auth, getUserData);

router.post('/borrow', auth, borrowMoney);

module.exports = router;
