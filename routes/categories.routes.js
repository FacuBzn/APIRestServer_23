const {Router} = require('express');
const { check } = require('express-validator');

const { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } = require('../controllers/categories.controllers');
const { validateJWT, validateFields } = require('../middlewares/index');

const router = Router();

// get all categories - public
router.get('/', getAllCategories); 

//get a category by id- public
router.get('/:id',getCategoryById ); 

//create category - anyone with a valid token
router.post('/',[
    validateJWT,
    check('nameCategory', 'The name of Category is required').not().isEmpty(),
    validateFields
], createCategory ); 

//update a category with a valid token - private
router.put('/:id',updateCategory ); 

//delete a category - only if you are an administrator
router.delete('/:id',deleteCategory ); 

module.exports = router;

