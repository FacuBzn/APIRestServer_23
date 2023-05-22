const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    
    nameUser:{
        type: String,
        required: [true, ' the name of the user is required']
    },
    email:{
        type: String,
        required: [true, ' the email is required'],
        unique: true        
    },
    password:{
        type: String,
        required: [true, ' the password is required'],        
    },
    img:{
        type: String,       
    },
    role:{
        type: String,   
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE', 'VENTAS_ROLE']    
    },
    statusUser:{
        type: Boolean,    
        default: true,
    },
    google:{
        type: Boolean,    
        default: false,
    }
})

UserSchema.methods.toJSON = function(){
    const { __v, _id, password ,... user }=this.toObject();
    return user;
}

module.exports = model('Users', UserSchema);
















