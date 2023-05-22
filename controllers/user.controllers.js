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

    const {id} = req.params;
    const {_id, password, google,... resto} = req.body //no necesito que se grabe

    if (password) {
        //encrypt password 
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const userUpdated = await User.findByIdAndUpdate(id, resto);

    res.json({
        msg:'PUT request to API server',
        userUPdate: resto     
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