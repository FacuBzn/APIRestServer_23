const { response , request} = require('express');

const userGet = (req = request, res=response) =>{ // GET request to API server

    const params = req.body;

    res.json({
        msg:'GET request to API server',
        params: params
    });
}

const userCreate = (req, res=response) =>{ // POST request to API server
    
    const user = req.body

    res.json({
        msg:'POST request to API server',
        user
    });
}

const userUpdate = (req, res=response) =>{ // PUT request to API server

    const id = req.params.id;

    res.json({
        msg:'PUT request to API server',
        id
    });
}

const userDelete = (req, res=response) =>{ // DELETE request to API server
    
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