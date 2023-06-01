const {Router} = require('express');
const { check } = require('express-validator');

const { login , googleSignIn} = require('../controllers/auth.controllers');
const { validateFields } = require('../middlewares/validate_fields');

const router = Router();

router.post('/login',[
    check('email', 'the email entered is not valid').isEmail(),
    check('password', 'the password is required').not().isEmpty(),
    validateFields
], login);

router.post('/google',[
    check('id_token', 'the token for Google entered is requered').not().isEmpty(),
    validateFields
], googleSignIn);

module.exports = router;