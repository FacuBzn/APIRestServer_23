const {response} = require('express');
const bcryptjs = require('bcryptjs');

const Categories = require('../model/category');

const createCategory = async (req, res = response) => {

    try {
        const nameCategory = req.body.nameCategory.toUpperCase();
        const categoryDB = await Categories.findOne({ nameCategory });
    
        if (categoryDB) {
            return res.status(400).json({
              msg: `The Category name ${categoryDB.nameCategory} already exists`
            });
        }          
        // data that I want to save 
        const data = {
            nameCategory,
            user: req.user._id
        }
    
        console.log(data);    
        const category = new Categories(data);
    
        //save to database
        await category.save();
    
        res.status(201).json({ category });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'An error occurred' });
    } 
    
}

const getAllCategories = async (req, res = response) => {
    res.json({ msg: 'Success Token - GET ALL', });
}

const getCategoryById = async (req, res = response) => {
    res.json({ msg: 'Success Token - GET BY ID', });
}

const updateCategory = async (req, res = response) => {
    res.json({ msg: 'Success Token - PUT', });
}

const deleteCategory = async (req, res = response) => {
    res.json({ msg: 'Success Token - DELETE', });
}

module.exports ={
    createCategory,
    getAllCategories, 
    getCategoryById,
    updateCategory,
    deleteCategory,
}