const {Router} = require('express');
const { check } = require('express-validator');

const { createProduct, 
        getAllProducts, 
        getProductById,
        updateProduct,
        deleteProduct, } = require('../controllers/products.controllers');

const { validateJWT, validateFields ,isAdminRole} = require('../middlewares/index');

const { productExistsById, categoryExistsById } = require('../helpers/db_validators');

const router = Router();

//create route for products 
router.post('/',[
    validateJWT,
    check('nameProduct', 'The name of Product is required').not().isEmpty(),
    check('category','It is not a valid id').isMongoId(),
    check('category').custom(categoryExistsById),
    validateFields
], createProduct);

//get all products
router.get('/', getAllProducts);

//get products by Id o por Category
router.get('/:id', [
    check('id','It is not a valid id').isMongoId(),
    check('id').custom(productExistsById),
    validateFields
], getProductById);

//update products
router.put('/:id', [
    validateJWT,
    check('id','It is not a valid id').isMongoId(),
    check('id').custom(productExistsById),
    validateFields
], updateProduct);

//delete products
router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id','It is not a valid id').isMongoId(),
    check('id').custom(productExistsById),
    validateFields
], deleteProduct);

module.exports = router;