const { response } = require('express');

const isAdminRole = (req, res = response, next) => {

    if ( !req.user ) {
        return res.status(500).json({
            msg: 'You want to verify the role without validating the token first'
        })
    }    
    const { role, nameUser } = req.user;
    console.log('ROLE THE USER: ',role);
    if ( role !== 'ADMIN_ROLE') {
        return res.status(401).json({ 
            msg:'You do not have permission for this'
        });
    }

    next();
}

const hasRole = ( ...roles  ) => {
    return (req, res = response, next) => {       
        if ( !req.user ) {
            return res.status(500).json({
                msg: 'You want to verify the role without validating the token first'
            });
        }
        if ( !roles.includes( req.user.role ) ) {
            return res.status(401).json({
                msg: `The service requires one of these roles ${ roles }`
            });
        }

        next();
    }
}

module.exports = {isAdminRole, hasRole};