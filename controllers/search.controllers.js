const {response} = require('express');
const { ObjectId } = require('mongoose').Types;
const { User, Categories, Product } = require('../model/index');

const collectionsAllowed = ['users', 'categories', 'products', 'roles'];

const searchUsers = async (termino = '', res = response ) => {

    const isMongoID = ObjectId.isValid(termino); //if It is a MongoDB id returns true

    if (isMongoID) {
        const user = await User.findById(termino);
        res.json({
            result: (user) ? [user] : []
        });
    }

}

const search = (req, res = response ) => {

    const {coleccion, termino} = req.params;

    if ( !collectionsAllowed.includes( coleccion )) {
        return res.status(400).json({
            msg: `The collection allowed are: ${collectionsAllowed}`
        })  
    }

    switch (coleccion) {
        case 'users': 
            searchUsers(termino,res);           
        break;

        case 'categories':            
            break;

        case 'products':
  
        default:
            res.status(500).json({
                msg: `More validations are missing`
            })
        break;
    }

}

module.exports ={
    search,
}