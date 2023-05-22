const Role = require('../model/role');
const User = require('../model/user');

const isRoleValid = async (role ='') => {
    const existRole = await Role.findOne({ role });
    if ( !existRole ){
        throw new Error(`The role ${role} isn't registered in the database`)
    }
}

const emailExist = async (email ='') => {

    //Check if the email exists 
    const existEmail = await User.findOne({email});
    if ( existEmail ){ // si el email ya existe (true) devuelvo un mensaje con que el email ya existe.
        throw new Error(`The email ${email} already registered`)
    }
}  




module.exports = {isRoleValid, emailExist}