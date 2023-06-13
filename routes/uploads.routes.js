const {Router} = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate_fields');
const { uploadFiles } = require('../controllers/uploads.controllers');

const router = Router();

router.post('/', uploadFiles );

module.exports = router;