import express from 'express';
import { getAllCategoriesController, getCategoryByIdController  } from '../controller/categories.Controller.js';

const router = express.Router();

router.get('/categories', getAllCategoriesController);
router.get('/category/:id', getCategoryByIdController);


export default router;