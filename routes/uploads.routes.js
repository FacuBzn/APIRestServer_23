const {Router} = require('express');
const { check } = require('express-validator');

const { validateFields , validateUploadFile } = require('../middlewares');
const { colectionAvailable } = require('../helpers');
const { uploadFiles, updateImage , showImage, updateImageForCloudinary} = require('../controllers/uploads.controllers');

const router = Router();

router.post('/', validateUploadFile , uploadFiles );

router.put('/:coleccion/:id', [
    validateUploadFile,
    check('id','It is not a valid id').isMongoId(),
    check('coleccion').custom( c => colectionAvailable (c, ['users', 'products'])),
    validateFields
], updateImageForCloudinary );
/* ], updateImage ); */

router.get('/:coleccion/:id', [
    check('id','It is not a valid id').isMongoId(),
    check('coleccion').custom( c => colectionAvailable (c, ['users', 'products'])),
    validateFields
] , showImage );

module.exports = router;