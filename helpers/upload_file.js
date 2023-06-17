const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadedFile = ( files , extValid = ['png', 'jpg', 'jpeg', 'gif'] , folder ='') => {

    return new Promise((resolve, reject) => {
        const {archivo} = files;
    
        const cutName = archivo.name.split('.');
        const extentOfFile = cutName[cutName.length - 1];
    
        //validate to extent of file

        if ( !extValid.includes(extentOfFile) ){
            return reject(`the following extension ${extentOfFile} is not valid, the following are allowed: ${extValid}`);
        }
            
        const nameTemp = uuidv4()+'.'+ extentOfFile;
        const uploadPath = path.join( __dirname, '../uploads/',folder , nameTemp) ;
      
        archivo.mv(uploadPath, (err) => {
          if (err) {
            return reject(err);           
          }      
          resolve ( nameTemp );
        });
    });


};


module.exports = {
    uploadedFile,
}
