const express = require('express');
const cors = require('cors');

const { dbConnection }= require('../database/config');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.usersPath = '/api/users';
        this.authPath = '/api/auth';

        this.conectarDB();
        this.middlewares();
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        //cors
        this.app.use(cors());
        //lectura y parseo del body
        this.app.use(express.json());
        //Directori public
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use( this.usersPath , require('../routes/user.routes'));
        this.app.use( this.authPath , require('../routes/auth.routes'));
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log('Servidor corriendo en puerto ->', this.port, 'ingresar en http://localhost:'+this.port);
        });
    }
}

module.exports = Server;








