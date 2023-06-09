const {response} = require('express');
const { ObjectId } = require('mongoose').Types;
const { User, Category, Product } = require('../model/index');

const collectionsAllowed = ['users', 'categories', 'products', 'roles'];

const searchUsers = async (termino = '', res = response ) => {

    const isMongoID = ObjectId.isValid(termino); //if It is a MongoDB id returns true

    if (isMongoID) {
        const user = await User.findById(termino);
        return res.json({
            result: (user) ? [user] : []
        });
    }
    
    /* Aquí se crea un objeto RegExp utilizando el constructor new RegExp(). 
    El primer argumento, termino, es el patrón de búsqueda que se desea utilizar en la expresión regular. 
    El segundo argumento, 'i', es una bandera que se utiliza para realizar una 
    búsqueda insensible a mayúsculas y minúsculas. La 'i' significa "ignoreCase" (ignorar mayúsculas y minúsculas). */

    const regex = new RegExp(termino,'i'); 
    const searchConditions = {
        $or: [ {nameUser: regex}, {email: regex}],
        $and: [ {statusUser: true}]
    };
    /* Aquí, se utiliza el método find() de Mongoose para buscar documentos en la colección "User". 
    Se construye una consulta con el operador $or, que indica que se deben encontrar documentos que cumplan al menos una de las condiciones especificadas.
    Dentro de $or, se proporcionan dos condiciones separadas por coma. En la primera condición, { nameUser: regex }, 
    se busca coincidencia entre el campo "nameUser" y la expresión regular regex. En la segunda condición, { email: regex }, 
    se busca coincidencia entre el campo "email" y la misma expresión regular regex. */

    const totalUsers = await User.count(searchConditions);
    const users =  await User.find(searchConditions);

    res.json({
        totalUsers,
        result: users
    });

}

const searchCategories = async (termino = '', res = response ) => {

    const isMongoID = ObjectId.isValid(termino); //if It is a MongoDB id returns true

    if (isMongoID) {
        const categories = await Category.findById(termino);
        return res.json({
            result: (categories) ? [categories] : []
        });
    }

    const regex = new RegExp(termino,'i'); 
    const cat = await Category.find({nameCategory: regex}, {statusCategory:true});

    res.json({
        result: cat
    });
}

const searchProducts = async (termino = '', res = response ) => {

    const isMongoID = ObjectId.isValid(termino); //if It is a MongoDB id returns true

    if (isMongoID) {
        const products = await Product.findById(termino).populate("category","nameCategory");
        return res.json({
            result: (products) ? [products] : []
        });
    }
    
    const regex = new RegExp(termino,'i');     

    const products =  await Product.find({nameProduct: regex, statusProduct:true}).populate("category","nameCategory");

    res.json({
        result: products
    });
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
            searchCategories(termino,res);
        break;

        case 'products':
            searchProducts(termino,res);
        break;
  
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