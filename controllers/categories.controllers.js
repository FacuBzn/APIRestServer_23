const {response, request} = require('express');
const bcryptjs = require('bcryptjs');

const Categories = require('../model/category');

const createCategory = async (req, res = response) => {
    try {
        const nameCategory = req.body.nameCategory.toUpperCase();
        const categoryDB = await Categories.findOne({ nameCategory }).populate("user");
        if (categoryDB) {
            return res.status(400).json({
              msg: `The Category name ${categoryDB.nameCategory} already exists`
            });
        }          
        // data that I want to save 
        const data = {
            nameCategory,
            user: req.user
        }    
        const category = new Categories(data);    
        //save to database
        await category.save();    
        res.status(201).json({ category });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'An error occurred' });
    }     
}

const getAllCategories = async (req = request, res = response) => {
    
    try {
        const query = {statusCategory:true}

        const [total, categories]= await Promise.all([
            Categories.countDocuments(query),
            Categories.find(query).populate({
                path:'user',
                select: 'email role',
            }),
        ]);
        
        res.status(200).json({
            totalCategories: total,
            categories: categories,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'An error occurred' }); 
    }       
}

const getCategoryById = async (req, res = response) => {
        
    const { id } = req.params;
    try {
        const category = await Categories.findById( id ).populate({
            path:'user',
            select: 'email role',
        });  
        res.status(200).json({ category: category });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'An error occurred' }); 
    }
}

const updateCategory = async (req, res = response) => {
    const {id} = req.params;
    const {_id, ...resto} = req.body;

    resto.nameCategory = resto.nameCategory.toUpperCase(); // Convertir a mayúsculas

    const categoryUpd = await Categories.findByIdAndUpdate(id, resto);
    res.status(200).json({ categoryUpd: resto });
 
}

const deleteCategory = async (req, res = response) => {
    
    const {id}=req.params;
    const query = { statusCategory: false};

    try {
        const categoryDlt = await Categories.findByIdAndUpdate(id, query);
        res.status(200).json({ categoryDlt });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'An error occurred' });
    }
}

module.exports ={
    createCategory,
    getAllCategories, 
    getCategoryById,
    updateCategory,
    deleteCategory,
}