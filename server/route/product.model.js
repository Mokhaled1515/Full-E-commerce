import { Router } from 'express';
import auth from "../middlewere/auth.js"
import { createProductController, deleteProductDetails, getProductByCategory, getProductByCategoryAndSubCategory, getProductController, getproductDetails, searchProduct, updateProductDetails } from '../controllers/ProductController.js';
import { admin } from '../middlewere/Admin.js';
const productRouter = Router();

productRouter.post('/create', auth,admin,createProductController)
productRouter.post('/get',getProductController)
productRouter.post('/get-product-by-category', getProductByCategory)
productRouter.post('/get-product-by-category-and-subcategory',getProductByCategoryAndSubCategory)
productRouter.post('/get-product-details', getproductDetails)

// update product

productRouter.put('/update-product-details',auth,admin,updateProductDetails)

// delete product

productRouter.delete('/delete-product',auth,admin,deleteProductDetails)

// search product 

productRouter.post('/search-product',searchProduct)

export default productRouter    