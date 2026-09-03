import { Router } from "express";
import auth from "../middlewere/auth.js";
import { AddCategoryController, deleteCategoryController, getCategoryController, updateCategory} from "../controllers/categoryController.js"

const CategoryRouter = Router();

CategoryRouter.post('/add-category', auth,AddCategoryController)
CategoryRouter.get('/get', getCategoryController)
CategoryRouter.put('/update',auth, updateCategory)
CategoryRouter.delete('/delete', auth,deleteCategoryController)
export default CategoryRouter