import { Router } from "express";
import auth from "../middlewere/auth.js";
import { addToCartItemmController, deletCartItemQtyController, getCartItemController, updateCategoryItemQtyController } from "../controllers/cartController.js";

const cartRouter = Router()
cartRouter.post('/create',auth,addToCartItemmController)
cartRouter.get('/get',auth,getCartItemController)
cartRouter.put('/update-qty',auth,updateCategoryItemQtyController)
cartRouter.delete('/delete-cart-item',auth,deletCartItemQtyController)
export default cartRouter

