const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../model/user'); //crea instancias del modelo

const validateJWT = async (req= request, res= response, next) => {

    const token = req.header('authorizationToken');

    if ( !token ) {
        return res.status(401).json({
            msg:'There is no token in the request'
        });
    }

    try {
        
        const { uid } = jwt.verify(token, process.env.SECRET_KEY); //verify the token
        const user = await User.findById(uid);

        //Check if the User exist in the database                          
        if (!user){
            res.status(401).json({
                msg:'The token is invalid - User does not exist in the < Database >'
            });
        }
        //Check if uid has status <truez>          
        if (!user.statusUser){
            res.status(401).json({
                msg:'The token is invalid - User  with < false > status'
            });
        }

        req.user = user;        
        next(); 

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg:'The token is invalid'
        });
    }

}

module.exports = { validateJWT }









