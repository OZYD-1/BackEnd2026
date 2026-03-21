import { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from "../models/categories.Model.js";

export const getAllCategoriesController = async (req, res) => {
    try {
        const categories = await getAllCategories();
        if(categories.length === 0) {
            return res.status(200).json({message: "no categories", categories:[]})
        }
        return res.status(200).json({message: "categories fetched seccesfully", categories})
    }
    catch(err) {
        return res.status(500).json({message: "internal server error"})
    }
}

export const getCategoryByIdController = async (req, res) => {
    const catid = req.params.id;
    try {
        const category = await getCategoryById(catid);
        if(!category) {
            return res.status(404).json({message: "category not found"})
        }
        return res.status(200).json({message: "category fetched successfully", category})
    }
    catch(err) {
        return res.status(500).json({message: "internal server error"})
    }
}