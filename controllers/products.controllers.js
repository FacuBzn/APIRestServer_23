const {response, request} = require('express');

const Product = require('../model/product');

const createProduct = async (req = request, res = response) => {

    try {
        const {statusProduct, user, ...body} = req.body; 
        const nameProduct = req.body.nameProduct.toUpperCase();
            
        const productDB = await Product.findOne({ nameProduct })
        .populate({
            path:'user',
            select: 'email role'
        })
        .populate({
            path:'category', 
            select: 'nameCategory'
        });

        if (productDB) {
            return res.status(400).json({
              msg: `The Product name ${nameProduct} already exists`
            });
        }          
        // data that I want to save 
        const data = {
            ...body,
            nameProduct: nameProduct,
            user: req.user._id,
        }    
        const product = new Product(data); 

        //save to database
        await product.save();    
        res.status(201).json({ product: product });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'An error occurred' });
    }  

};


const getAllProducts = async (req = request, res = response) => {
 
    try {
        const query = {statusProduct:true}

        const [total, products]= await Promise.all([
            Product.countDocuments(query),
            Product.find(query)
            .populate({
                path:'user',
                select: 'email role'
            })
            .populate({
                path:'category', 
                select: 'nameCategory'
            }),
        ]);
        
        res.status(200).json({
            totalProducts: total,
            products: products,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'An error occurred' }); 
    }   

};


const getProductById = async (req, res = response) => {

    const { id } = req.params;
    try {
        const product = await Product.findById( id )
            .populate({
                    path:'category', 
                    select: 'nameCategory'
            }) 
            .populate({
                path:'user',
                select: 'email role'
            });
            
        
        res.status(200).json({ product: product });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'An error occurred' }); 
    }
};


const updateProduct = async (req, res = response) => {

    const {id} = req.params;
    const {_id, statusProduct ,user , ...resto} = req.body;

    console.log(resto);
    if (resto.nameProduct) {
        resto.nameProduct = resto.nameProduct.toUpperCase(); // Convertir a mayúsculas        
    }
    resto.user = req.user._id;

    const productUpd = await Product.findByIdAndUpdate(id, resto, {new: true}); //el new es para que mande el nuevo archivo
    res.status(200).json({ productUpd: resto });


};


const deleteProduct = async (req, res) => {

    const {id} = req.params;
    const query = { statusProduct: false};

    try {
        const productDlt = await Product.findByIdAndUpdate(id, query , {new: true}); //el new es para que mande el nue
        res.status(200).json({ productDlt });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'An error occurred' });
    }

};



module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
}




