const router = require('express').Router();
const { authRegister, authLogin } = require('../controller/authController');


// REGISTER

router.post('/register', authRegister);


// LOGIN

router.post('/login', authLogin)

module.exports = router;