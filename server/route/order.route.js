import { Router } from "express"
import auth from "../middlewere/auth.js"
import { CashOnDeliveryOrderController, getOrderDetailsController, paymentController, webhookStripe } from "../controllers/OrderController.js"

const orderRouter = Router()

orderRouter.post('/cash-on-delivery', auth,CashOnDeliveryOrderController)
orderRouter.post('/chekout',auth,paymentController)
orderRouter.post('/webhook',webhookStripe)
orderRouter.get('/order-list',auth,getOrderDetailsController)

export default orderRouter 