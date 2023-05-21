const Role = require('../model/role');

const isRoleValid = async (role ='') => {
    const existRole = await Role.findOne({ role });
    if ( !existRole ){
        throw new Error(`El role ${role} isn't registered in the database`)
    }
}

module.exports = {isRoleValid}