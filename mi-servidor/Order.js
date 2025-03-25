import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  products: [{ productId: String, quantity: Number }],
  total: Number,
  status: { type: String, enum: ["pendiente", "completado"], default: "pendiente" }
});

export const Order = mongoose.model("Order", orderSchema);

