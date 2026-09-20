// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.ObjectId,
//       ref: "User",
//     },
//     orderId: {
//       type: String,
//       // required : [true, "Provide orderId"],
//       // unique : true
//       required: [true, "Provide orderId"],
//       index: true,
//     },
//     productId: {
//       type: mongoose.Schema.ObjectId,
//       ref: "product",
//     },
//     product_details: {
//       name: String,
//       image: Array,
//     },
//     paymentId: {
//       type: String,
//       default: "",
//     },
//     payment_status: {
//       type: String,
//       default: "",
//     },
//     delivery_address: {
//       type: mongoose.Schema.ObjectId,
//       ref: "address",
//     },
//     subTotalAmt: {
//       type: Number,
//       default: 0,
//     },
//     totalAmt: {
//       type: Number,
//       default: 0,
//     },
//     invoice_receipt: {
//       type: String,
//       default: "",
//     },
//   },
//   {
//     timestamps: true,
//   },
// );

// const OrderModel = mongoose.model("order", orderSchema);

// export default OrderModel;

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },

    // Same orderId for all products in the same checkout
    orderId: {
      type: String,
      required: [true, "Provide orderId"],
      index: true,
    },

    productId: {
      type: mongoose.Schema.ObjectId,
      ref: "product",
    },

    product_details: {
      name: String,
      image: Array,
    },

    // Quantity of this product
    quantity: {
      type: Number,
      default: 1,
    },

    paymentId: {
      type: String,
      default: "",
    },

    payment_status: {
      type: String,
      default: "",
    },

    delivery_address: {
      type: mongoose.Schema.ObjectId,
      ref: "address",
    },

    // Subtotal of the complete order
    subTotalAmt: {
      type: Number,
      default: 0,
    },

    // Total of the complete order
    totalAmt: {
      type: Number,
      default: 0,
    },

    // Total price of this specific product
    itemTotalAmt: {
      type: Number,
      default: 0,
    },

    invoice_receipt: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const OrderModel = mongoose.model("order", orderSchema);

export default OrderModel;
