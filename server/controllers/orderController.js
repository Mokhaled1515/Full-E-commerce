import Stripe from "../config/stripe.js";
import CartProductModel from "../models/cartproduct.model.js";
import OrderModel from "../models/order.model.js";
import UserModel from "../models/user.models.js";
import mongoose from "mongoose";

// export async function CashOnDeliveryOrderController(req, res) {
//   try {
//     const userId = req.userId;
//     const { list_items, totalAmt, addressId, subTotalAmt } = req.body;

//     const payload = list_items.map((el) => {
//       return {
//         userId: userId,
//         orderId: `ORD-${new mongoose.Types.ObjectId()}`,
//         productId: el.productId._id,
//         product_details: {
//           name: el.productId.name,
//           image: el.productId.image,
//         },
//         paymentId: "",
//         payment_status: "CASH ON DELIVERY",
//         delivery_address: addressId,
//         subTotalAmt: subTotalAmt,
//         totalAmt: totalAmt,
//       };
//     });

//     const generatedOrder = await OrderModel.insertMany(payload);

//     //   remove from the cart

//     const removeCartItems = await CartProductModel.deleteMany({
//       userId: userId,
//     });

//     const updateInUser = await UserModel.updateOne(
//       { _id: userId },
//       { shopping_cart: [] },
//     );

//     return res.json({
//       message: "Order successfully",
//       error: false,
//       success: true,
//       data: generatedOrder,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: error.message || error,
//       error: true,
//       success: false,
//     });
//   }
// }

export async function CashOnDeliveryOrderController(req, res) {
  try {
    const userId = req.userId;

    const { list_items, totalAmt, addressId, subTotalAmt } = req.body;

    // One Order ID for the entire checkout
    const orderId = `ORD-${new mongoose.Types.ObjectId()}`;

    const payload = list_items.map((el) => {
      const quantity = Number(el.quantity || 1);

      const itemPrice = pricewithDiscount(
        el.productId.price,
        el.productId.discount,
      );

      const itemTotalAmt = itemPrice * quantity;

      return {
        userId,

        // Same orderId for all products
        orderId,

        productId: el.productId._id,

        product_details: {
          name: el.productId.name,
          image: el.productId.image,
        },

        quantity,

        paymentId: "",

        payment_status: "CASH ON DELIVERY",

        delivery_address: addressId,

        subTotalAmt,

        // Total of the complete order
        totalAmt,

        // Total of this specific product
        itemTotalAmt,
      };
    });

    const generatedOrder = await OrderModel.insertMany(payload);

    // Remove products from cart
    await CartProductModel.deleteMany({
      userId,
    });

    await UserModel.updateOne(
      { _id: userId },
      {
        shopping_cart: [],
      },
    );

    return res.json({
      message: "Order successfully",
      error: false,
      success: true,
      data: generatedOrder,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export const pricewithDiscount = (price, dis = 1) => {
  const discountAmount = Math.ceil((Number(price) * Number(dis)) / 100);
  const actualPrice = Number(price) - Number(discountAmount);
  return actualPrice;
};

export async function paymentController(req, res) {
  try {
    const userId = req.userId; // auth middleware
    const { list_items, totalAmt, addressId, subTotalAmt } = req.body;
    const user = await UserModel.findById(userId);

    const line_items = list_items.map((item) => {
      return {
        price_data: {
          currency: "EGP",
          product_data: {
            name: item.productId.name,
            images: item.productId.image,
            metadata: {
              productId: item.productId._id,
            },
          },
          unit_amount:
            pricewithDiscount(item.productId.price, item.productId.discount) *
            100,
        },
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
        },
        quantity: item.quantity,
      };
    });

    const params = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: user.email,
      metadata: {
        userId: userId,
        addressId: addressId,
      },
      line_items: line_items,
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    };

    const session = await Stripe.checkout.sessions.create(params);

    return res.status(200).json(session);
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// valid -->  stripe listen --forward-to localhost:8080/api/order/webhook

// const getOrderProductItems = async ({
//   lineItems,
//   userId,
//   addressId,
//   paymentId,
//   payment_status,
// }) => {
//   const productList = [];

//   if (lineItems?.data?.length) {
//     for (const item of lineItems.data) {
//       const product = await Stripe.products.retrieve(item.price.product);

//       const paylod = {
//         userId: userId,
//         orderId: `ORD-${new mongoose.Types.ObjectId()}`,
//         productId: product.metadata.productId,
//         product_details: {
//           name: product.name,
//           image: product.images,
//         },
//         paymentId: paymentId,
//         payment_status: payment_status,
//         delivery_address: addressId,
//         subTotalAmt: Number(item.amount_total / 100),
//         totalAmt: Number(item.amount_total / 100),
//       };

//       productList.push(paylod);
//     }
//   }

//   return productList;
// };

// const getOrderProductItems = async ({
//   lineItems,
//   userId,
//   addressId,
//   paymentId,
//   payment_status,
//   totalAmt,
//   subTotalAmt,
// }) => {
//   const productList = [];

//   // ONE order ID for the entire checkout
//   const orderId = `ORD-${new mongoose.Types.ObjectId()}`;

//   if (lineItems?.data?.length) {
//     for (const item of lineItems.data) {
//       const product = await Stripe.products.retrieve(item.price.product);

//       const quantity = Number(item.quantity || 1);

//       const itemTotalAmt = Number(item.amount_total || 0) / 100;

//       productList.push({
//         userId,

//         orderId,

//         productId: product.metadata.productId,

//         product_details: {
//           name: product.name,
//           image: product.images,
//         },

//         quantity,

//         paymentId,

//         payment_status,

//         delivery_address: addressId,

//         subTotalAmt,

//         totalAmt,

//         itemTotalAmt,
//       });
//     }
//   }

//   return productList;
// };

// export async function webhookStripe(request, response) {
//   const event = request.body;
//   const endPointSecret = process.env.STRIPE_ENDPOINT_WEBHOOK_SECRET_KEY;

//   console.log("event", event);

//   // Handle the event
//   switch (event.type) {
//     case "checkout.session.completed":
//       const session = event.data.object;
//       const lineItems = await Stripe.checkout.sessions.listLineItems(
//         session.id,
//       );
//       const userId = session.metadata.userId;
//       // const orderProduct = await getOrderProductItems({
//       //   lineItems: lineItems,
//       //   userId: userId,
//       //   addressId: session.metadata.addressId,
//       //   paymentId: session.payment_intent,
//       //   payment_status: session.payment_status,
//       // });

//       export async function webhookStripe(request, response) {
//         const event = request.body;

//         try {
//           switch (event.type) {
//             case "checkout.session.completed": {
//               const session = event.data.object;

//               const lineItems = await Stripe.checkout.sessions.listLineItems(
//                 session.id,
//               );

//               const userId = session.metadata.userId;

//               const orderProduct = await getOrderProductItems({
//                 lineItems,

//                 userId,

//                 addressId: session.metadata.addressId,

//                 paymentId: session.payment_intent,

//                 payment_status: session.payment_status,

//                 totalAmt: Number(session.amount_total || 0) / 100,

//                 subTotalAmt: Number(session.amount_subtotal || 0) / 100,
//               });

//               const order = await OrderModel.insertMany(orderProduct);

//               console.log("Created Orders:", order);

//               if (Boolean(order[0])) {
//                 await UserModel.findByIdAndUpdate(userId, {
//                   shopping_cart: [],
//                 });

//                 await CartProductModel.deleteMany({
//                   userId,
//                 });
//               }

//               break;
//             }

//             default:
//               console.log(`Unhandled event type ${event.type}`);
//           }

//           response.json({
//             received: true,
//           });
//         } catch (error) {
//           console.error("Stripe webhook error:", error);

//           response.status(500).json({
//             success: false,
//             error: true,
//             message: error.message || error,
//           });
//         }
//       }

//       const order = await OrderModel.insertMany(orderProduct);

//       console.log(order);
//       if (Boolean(order[0])) {
//         const removeCartItems = await UserModel.findByIdAndUpdate(userId, {
//           shopping_cart: [],
//         });
//         const removeCartProductDB = await CartProductModel.deleteMany({
//           userId: userId,
//         });
//       }
//       break;
//     default:
//       console.log(`Unhandled event type ${event.type}`);
//   }

//   // Return a response to acknowledge receipt of the event
//   response.json({ received: true });
// }

const getOrderProductItems = async ({
  lineItems,
  userId,
  addressId,
  paymentId,
  payment_status,
  totalAmt,
  subTotalAmt,
}) => {
  const productList = [];

  // One order ID for the entire checkout
  const orderId = `ORD-${new mongoose.Types.ObjectId()}`;

  if (lineItems?.data?.length) {
    for (const item of lineItems.data) {
      const product = await Stripe.products.retrieve(item.price.product);

      const quantity = Number(item.quantity || 1);

      const itemTotalAmt = Number(item.amount_total || 0) / 100;

      productList.push({
        userId,
        orderId,

        productId: product.metadata.productId,

        product_details: {
          name: product.name,
          image: product.images,
        },

        quantity,

        paymentId,
        payment_status,

        delivery_address: addressId,

        // Full checkout subtotal
        subTotalAmt,

        // Full checkout total
        totalAmt,

        // This product's total
        itemTotalAmt,
      });
    }
  }

  return productList;
};

export async function webhookStripe(request, response) {
  const event = request.body;

  console.log("Stripe event:", event.type);

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;

        const lineItems = await Stripe.checkout.sessions.listLineItems(
          session.id,
        );

        const userId = session.metadata.userId;

        const orderProduct = await getOrderProductItems({
          lineItems,
          userId,
          addressId: session.metadata.addressId,
          paymentId: session.payment_intent,
          payment_status: session.payment_status,

          // Full checkout values
          totalAmt: Number(session.amount_total || 0) / 100,
          subTotalAmt: Number(session.amount_subtotal || 0) / 100,
        });

        const order = await OrderModel.insertMany(orderProduct);

        console.log("Created Orders:", order);

        if (order.length > 0) {
          await UserModel.findByIdAndUpdate(userId, {
            shopping_cart: [],
          });

          await CartProductModel.deleteMany({
            userId,
          });
        }

        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return response.json({
      received: true,
    });
  } catch (error) {
    console.error("Stripe webhook error:", error);

    return response.status(500).json({
      success: false,
      error: true,
      message: error.message || error,
    });
  }
}
export async function getOrderDetailsController(req, res) {
  try {
    const userId = req.userId;
    const orderlist = await OrderModel.find({ userId: userId })
      .sort({ createdAt: -1 })
      .populate("delivery_address");

    return res.json({
      message: "order list",
      data: orderlist,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function getAllOrdersController(req, res) {
  try {
    const orders = await OrderModel.find()
      .sort({ createdAt: -1 })
      .populate("userId", "name email mobile")
      .populate("delivery_address");

    return res.json({
      message: "All orders",
      data: orders,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
