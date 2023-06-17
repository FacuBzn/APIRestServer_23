const validateFields = require('../middlewares/validate_fields');
const validateJWT = require('../middlewares/validate_jwt');
const validateRoles = require('../middlewares/validate_roles');
const validateUploadFiles = require('../middlewares/validate_uploadFiles');

module.exports = {
    ...validateFields,
    ...validateJWT,
    ...validateRoles,
    ...validateUploadFiles,
}