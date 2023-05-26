const validateFields = require('../middlewares/validate_fields');
const validateJWT = require('../middlewares/validate_jwt');
const validateRoles = require('../middlewares/validate_roles');

module.exports = {
    ...validateFields,
    ...validateJWT,
    ...validateRoles,
}