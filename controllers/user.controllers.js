const { response , request} = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../model/user'); //crea instancias del modelo


const userGet = async (req = request, res=response) =>{ // GET request to API server

    try {
        const { limite=5, desde=0 } = req.query; 
        const query = { statusUser:true}
    
        const [total, users] = await Promise.all([
            User.countDocuments(query),
            User.find(query)
            .skip(Number (desde))
            .limit(Number (limite))
        ]);
    
        res.status(200).json({
            totalUsers: total,
            users: users
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'An error occurred' });
    }

}

const userCreate = async (req, res=response) =>{ // POST request to API server
    
    try {
        const { nameUser, email, password, role } = req.body  //nombres que yo quiero sacar y grabar solamente 
        const user = new User({nameUser, email, password, role});  //estos son los campos que deseo guardar en mongodb
    
        //encrypt password 
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);
        //save to Database
    
        await user.save();
    
        res.status(201).json({ user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'An error occurred' });
    }


}

const userUpdate = async (req, res=response) =>{ // PUT request to API server

    try {
        const {id} = req.params;
        const {_id, password, google,... resto} = req.body //no necesito que se grabe

        if (password) {
            //encrypt password 
            const salt = bcryptjs.genSaltSync();
            resto.password = bcryptjs.hashSync(password, salt);
        }
        const userUpdated = await User.findByIdAndUpdate(id, resto);

        res.status(200).json({ userUpdated: resto });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'An error occurred' });
    }    
}

const userDelete = async (req, res=response) =>{ // DELETE request to API server
    
    const {id} = req.params;
    const query = { statusUser:false}

/*  const userDeleted = await User.findByIdAndUpdate(id, query);            
    res.json({ userDeleted });  */
    try {
        const userDeleted = await User.findByIdAndUpdate(id, query);
        res.status(200).json({ userDeleted });
      } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'An error occurred' });
      }
}

module.exports = {
    userGet,
    userCreate,
    userUpdate, 
    userDelete,
}