const {Router} = require('express');
const { check } = require('express-validator');

const { getAllCategories, 
        getCategoryById, 
        createCategory, 
        updateCategory, 
        deleteCategory 
} = require('../controllers/categories.controllers');

const { validateJWT, validateFields ,isAdminRole} = require('../middlewares/index');

const { categoryExistsById } = require('../helpers/db_validators');

const router = Router();

// get all categories - public
router.get('/', getAllCategories); 

//get a category by id- public
router.get('/:id',[
    check('id','It is not a valid id').isMongoId(),
    check('id').custom(categoryExistsById),
    validateFields
], getCategoryById ); 

//create category - anyone with a valid token
router.post('/',[
    validateJWT,
    check('nameCategory', 'The name of Category is required').not().isEmpty(),
    validateFields
], createCategory ); 

//update a category with a valid token - private
router.put('/:id',[ 
    validateJWT,
    check('nameCategory', 'The name of Category is required').not().isEmpty(),
    check('id').custom(categoryExistsById),
    validateFields
], updateCategory ); 

//delete a category - only if you are an administrator
router.delete('/:id',[
    validateJWT,
    isAdminRole,
    check('id','It is not a valid id').isMongoId(),
    check('id').custom(categoryExistsById),
    validateFields
], deleteCategory ); 

module.exports = router;

