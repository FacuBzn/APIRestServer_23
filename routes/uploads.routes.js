const {Router} = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares');
const { colectionAvailable } = require('../helpers');
const { uploadFiles, updateImage } = require('../controllers/uploads.controllers');

const router = Router();

router.post('/', uploadFiles );

router.put('/:coleccion/:id', [
    check('id','It is not a valid id').isMongoId(),
    check('coleccion').custom( c => colectionAvailable (c, ['users', 'products'])),
    validateFields
], updateImage );

module.exports = router;