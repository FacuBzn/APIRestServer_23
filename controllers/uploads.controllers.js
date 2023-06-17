const path = require('path');
const fs = require('fs');

// Require the Cloudinary library
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);

const { response } = require('express');
const { uploadedFile } = require('../helpers');

const { User, Product} = require('../model');

const uploadFiles  = async (req, res= response) => {
 
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

  //clean image 
  if ( modelo.img ) {
    //remove to image
    const pathImg = path.join( __dirname, '../uploads', coleccion, modelo.img);
    if ( fs.existsSync( pathImg )) {
      fs.unlinkSync( pathImg );
    }
  }

  const nameFile = await uploadedFile( req.files, undefined, coleccion);
  modelo.img = nameFile;
  await modelo.save();
  res.json(modelo);

};


const showImage = async (req, res = response) => {

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

  //clean image 
  if ( modelo.img ) {
    //remove to image
    const pathImg = path.join( __dirname, '../uploads', coleccion, modelo.img);
    if ( fs.existsSync( pathImg )) {
      return res.sendFile( pathImg );
    }
  }

  const pathImg = path.join( __dirname, '../assets/no-image.jpg');
  res.sendFile( pathImg );

};

const updateImageForCloudinary = async (req, res = response) => {
  
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

  //clean image 
  if ( modelo.img ) {
    //remove to image
    const nameArr = modelo.img.split('/');
    const name = nameArr [nameArr.length - 1];

    const [ public_id ] = name.split('.');
    await cloudinary.uploader.destroy(public_id);
    
  }
    console.log(req.files.archivo);
    const { tempFilePath } = req.files.archivo;
    const {secure_url} = await cloudinary.uploader.upload( tempFilePath );

  modelo.img = secure_url;
  await modelo.save();

  res.json(modelo);

};



module.exports = { 
  uploadFiles , 
  updateImage , 
  showImage,
  updateImageForCloudinary,
};