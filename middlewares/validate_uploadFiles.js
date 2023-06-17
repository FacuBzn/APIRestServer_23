const { response } = require("express");

const validateUploadFile = async (req, res = response, next) => {
    
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo ) { // the "archivo" is the one found on the postman endpoint
        res.status(400).json({msg:'No files were uploaded. archivo validation'});
        return;
    }
    next();
};

module.exports = { validateUploadFile }