const {Router} = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/auth.controllers');
const { validateFields } = require('../middlewares/validate_fields');

const router = Router();

router.post('/login',[
    check('email', 'the email entered is not valid').isEmail(),
    check('password', 'the password is required').not().isEmpty(),
    validateFields
], login);

module.exports = router;