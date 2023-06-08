const { Schema, model, mongoose} = require('mongoose');
const Product = require('../model/product');

const ProductSchema =Schema({
    
    nameProduct:{
        type: String,
        unique: true,
        required: [true, ' the name of the Product is required']
    },
    price:{
        type: Number,
        default: 0,
    },
    description:{
        type: String,        
    },
    available:{ 
        type: Boolean, 
        default: false
    },
    statusProduct:{
        type: Boolean,
        default: true, 
        required: true,
    },
    category:{
        type: mongoose.Schema.ObjectId,
        ref: 'Categories',
        required: true,
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'Users',
        /* required: true, */
    },
    
})

ProductSchema.methods.toJSON = function(){
    const { __v , _id, statusProduct, ... product } = this.toObject();
        product.uid = _id;
    return product;
}

module.exports = model('Product', ProductSchema); 
// categories deberia ir en singular "dato"