const { Schema, model } = require('mongoose');

const CategoriesSchema = Schema({
    
    nameCategory:{
        type: String,
        unique: true,
        required: [true, ' the name of the Category is required']
    },
    status:{
        type: Boolean,
        default: true, 
        required: true,
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
    
})

module.exports = model('Categories', CategoriesSchema); 
// categories deberia ir en singular "dato"
















