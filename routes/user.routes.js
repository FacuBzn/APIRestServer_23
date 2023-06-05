const {Router} = require('express');
const { check } = require('express-validator');

const { userGet , 
        userCreate, 
        userUpdate, 
        userDelete
} = require('../controllers/user.controllers');

const { validateFields, validateJWT, isAdminRole, hasRole }= require('../middlewares/index');

const { isRoleValid , emailExist, userExistsById} = require('../helpers/db_validators');

const router = Router();

router.get('/', userGet);

router.post('/',[
    check('nameUser', 'The nameUser is required').not().isEmpty(),
    check('password', 'The password is required and must be more than 6 characters.').isLength({min:6}),
    check('email', 'The email entered is not valid').isEmail(),
    check('email').custom(emailExist),
    check('role').custom(isRoleValid),
    validateFields
], userCreate);

router.put('/:id', [
    check('id','It is not a valid id').isMongoId(),
    check('id').custom(userExistsById),
    check('role').custom(isRoleValid),
    validateFields
], userUpdate);

router.delete('/:id',[
    validateJWT,
    /* isAdminRole, */
    hasRole('ADMIN_ROLE','VENTAS_ROLE','NOSE_ROLE'),
    check('id','It is not a valid id').isMongoId(),
    check('id').custom(userExistsById),
    validateFields
], userDelete);

module.exports = router;











