const  mongoose = require('mongoose');

const dbConnection = async () =>{

    try {
        await mongoose.connect(process.env.MONGODB_ATLAS,{});

        console.log('Base de Datos "Conectada"');
    } catch (error) {
        throw new Error( error.message, 'Error en la conexion con Mongo db');
    }

}

module.exports = {dbConnection}