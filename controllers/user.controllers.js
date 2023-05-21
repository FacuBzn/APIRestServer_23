const { response , request} = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../model/user'); //crea instancias del modelo


const userGet = async (req = request, res=response) =>{ // GET request to API server

    const params = req.body;

    res.json({
        msg:'GET request to API server',
        params: params
    });
}

const userCreate = async (req, res=response) =>{ // POST request to API server
    
    const { nameUser, email, password, role } = req.body  //nombres que yo quiero sacar y grabar solamente 
    const user = new User({nameUser, email, password, role});  //estos son los campos que deseo guardar en mongodb

    //Check if the email exists 
    const existEmail = await User.findOne({email});
    if ( existEmail ){ // si el email ya existe (true) devuelvo un mensaje con que el email ya existe.
        return res.status(400).json({
            msg: `this email "${email}" already exists in the database`
        });
    }
    //encrypt password 
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
    //save to Database

    await user.save();

    res.json({
        msg:'POST request to API server',
        user
    });
}

const userUpdate = async (req, res=response) =>{ // PUT request to API server

    const id = req.params.id;

    res.json({
        msg:'PUT request to API server',
        id
    });
}

const userDelete = async (req, res=response) =>{ // DELETE request to API server
    
    const id = req.params.id;
        
    res.json({
        msg:'DELETE request to API server',
        id
    });
}

module.exports = {
    userGet,
    userCreate,
    userUpdate,
    userDelete,
}