const path = require('path');
const { response } = require('express');
const { uploadedFile } = require('../helpers');

const { User, Product} = require('../model');


const uploadFiles  = async (req, res= response) => {
 
    
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo ) { // the "archivo" is the one found on the postman endpoint
      res.status(400).json({msg:'No files were uploaded.'});
      return;
    }
    try {
      /* const fullPath = await uploadedFile( req.files, ['txt','md', 'docx'], 'texts')     */
      const fullPath = await uploadedFile( req.files, undefined, 'imgs')    
      res.json({name: fullPath});

    } catch (msg) {
      res.status(400).json({msg});
    }

};

const updateImage = async (req, res = response) => {

  const { id, coleccion } = req.params;
  let modelo;

  switch ( coleccion ) {
    case 'users': 
      modelo = await User.findById(id);
      if ( !modelo ){
        return res.status(400).json({ 
          msg:` There isn't user with the id ${id}`
        });
      }
    break;

    case 'products':  
      modelo = await Product.findById(id);
      if ( !modelo ){
        return res.status(400).json({ 
          msg:` There isn't product with the id ${id}`
        });
      }
    break;
  
    default:
      return res.status(500).json({ msg:'There is no validation for this Case' })
  }
  const nameFile = await uploadedFile( req.files, undefined, coleccion);
  modelo.img = nameFile;
  await modelo.save();
  res.json(modelo);
};

module.exports = { uploadFiles , updateImage };