const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  paymentId: { type: String },
  signature: { type: String },
  amount: { type: Number, required: true },
  status: { type: String, required: true, default: "pending" },
}, { timestamps: true });

module.exports = mongoose.model("Payment", PaymentSchema);
