const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    pidx: {
      type: String,
      required: true,
    },
    transactionId: {
      type: String,
      required: false,
    },
    payment_url: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "FAILED", "SUCCESS"],
      default: "PENDING",
    },
    paymentMethod: {
      type: String,
      enum: ["ONLINE"],
      default: "ONLINE",
    },
    provider: {
      type: String,
      enum: ["KHALTI", "ESEWA"],
      default: "KHALTI",
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
