const path = require('path');
const {response} = require('express');


const uploadFiles  = async (req, res= response) => {
 
    
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo ) { // the "archivo" is the one found on the postman endpoint
      res.status(400).json({msg:'No files were uploaded.'});
      return;
    }
  
    const {archivo} = req.files;
    
    const cutName = archivo.name.split('.');
    const extentOfFile = cutName[cutName.length - 1];

    //validate to extent of file
    const extValid = ['png', 'jpg', 'jpeg', 'gif'];
    if ( !extValid.includes(extentOfFile) ){
      return res.status(400).json({
        message:`the following extension ${extentOfFile} is not valid, the following are allowed ${extValid}`
      });
    }
    
    
    res.json({ msg:'extentOfFile: ' + extentOfFile });

/*     const uploadPath = path.join( __dirname, '../uploads/', archivo.name) ;
  
    archivo.mv(uploadPath, (err) => {
      if (err) {
        return res.status(500).json({err});
      }
  
      res.json({ msg:'File uploaded to ' + uploadPath });
    }); */

}

module.exports = { uploadFiles }