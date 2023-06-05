const { Schema, model, mongoose} = require('mongoose');
const User = require('../model/user');

const CategoriesSchema =Schema({
    
    nameCategory:{
        type: String,
        unique: true,
        required: [true, ' the name of the Category is required']
    },
    statusCategory:{
        type: Boolean,
        default: true, 
        required: true,
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'Users',
        required: true,
    },
    
})

CategoriesSchema.methods.toJSON = function(){
    const { __v , _id, statusCategory, ... categories } = this.toObject();
        categories.uid = _id;
    return categories;
}

module.exports = model('Categories', CategoriesSchema); 
// categories deberia ir en singular "dato"
















