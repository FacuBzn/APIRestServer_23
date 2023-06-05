const Role = require('../model/role');
const User = require('../model/user');
const Categories = require('../model/category');

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

const userExistsById = async (id) => {
    //Check if the email exists 
    const existUser = await User.findById(id);
    if ( !existUser ){ // si el email ya existe (true) devuelvo un mensaje con que el email ya existe.
        throw new Error(`The id: ${id} does not exist`)
    }
}  

const categoryExistsById = async (id) => {
    //Check if the category exists 
    const existCategory = await Categories.findById(id);
    if ( !existCategory ){ // si la categoria ya existe (true) devuelvo un mensaje con que la categoria ya existe.
        throw new Error(`The id: ${id} does not exist`)
    }
}  

module.exports = {isRoleValid, emailExist, userExistsById, categoryExistsById};