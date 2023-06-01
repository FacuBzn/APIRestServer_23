const {response} = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../model/user');
const { generateJWT } = require('../helpers/generate_jwt');



const login = async (req, res= response) => {

    const {email, password} = req.body;

    try {
        //Check if email exists
        const user = await User.findOne({email});
        if ( !user ) {
            return res.status(404).json({
                message: 'User / Password they are not correct'
            });
        }
        //Check if the user is active
        if ( !user.statusUser ) {
            return res.status(400).json({ 
                message: 'User / Password they are not correct - Status User: false '
            });
        }
        //Check if the password 
        const validPassword = bcryptjs.compareSync(password, user.password);
        if ( !validPassword ){
            return res.status(400).json({ 
                message: 'User / Password they are not correct - password '
            });
        }
        //Generate a jwt
        const token = await generateJWT(user.id);

        res.json({
            msg: 'Login successful',
            user,
            token            
        })
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Invalid login, call the admin'});
    }      
}

const googleSignIn = async (req, res = response) => {
    const {id_token} = req.body

    res.json({
        msg: 'Success Token',
        id_token
    })
}

module.exports ={
    login,
    googleSignIn
}