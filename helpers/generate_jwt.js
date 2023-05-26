const jwt = require('jsonwebtoken');

// uid = user identifier
const generateJWT = ( uid = '') =>{

    return new Promise((resolve, reject) =>{

        const payload = {uid};

        jwt.sign( payload, process.env.SECRET_KEY, {
            expiresIn: '5h'
        },( err, token ) => {            
            if(err) {
                console.log(error);
                reject('No se pudo generar el token',err);
            }else {
                resolve(token);
            }
        })
    })
}

module.exports = { generateJWT: generateJWT };