import { Router } from "express";
import auth from "../middlewere/auth.js";
import { admin } from "../middlewere/Admin.js";
import {
  CashOnDeliveryOrderController,
  getOrderDetailsController,
  paymentController,
  webhookStripe,
  getAllOrdersController,
} from "../controllers/orderController.js";

const orderRouter = Router();

orderRouter.post("/cash-on-delivery", auth, CashOnDeliveryOrderController);
orderRouter.post("/chekout", auth, paymentController);
orderRouter.post("/webhook", webhookStripe);
orderRouter.get("/order-list", auth, getOrderDetailsController);
orderRouter.get("/admin-order-list", auth, admin, getAllOrdersController);

export default orderRouter;
