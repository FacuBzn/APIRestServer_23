const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConnection }= require('../database/config');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT || 3000;

        this.path= {
            auth:       '/api/auth',
            search:     '/api/search',
            user:       '/api/users',
            product:    '/api/products',
            uploads:       '/api/uploads',
            categories: '/api/categories',
        }

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
        //File upload  Note that this option available for versions 1.0.0 and newer. 
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath : true,
        }));

    }

    routes(){
        this.app.use( this.path.user ,      require('../routes/user.routes'));
        this.app.use( this.path.auth ,      require('../routes/auth.routes'));
        this.app.use( this.path.search ,    require('../routes/search.routes'));
        this.app.use( this.path.uploads ,   require('../routes/uploads.routes'));
        this.app.use( this.path.product ,   require('../routes/products.routes'));
        this.app.use( this.path.categories ,require('../routes/categories.routes'));
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log('Servidor corriendo en puerto ->', this.port, 'ingresar en http://localhost:'+this.port);
        });
    }
}

module.exports = Server;








