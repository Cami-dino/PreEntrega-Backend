import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 1 },
  stock: { type: Number, required: true, min: 0 },
  category: { type: String, required: true },
  thumbnails: { type: [String], default: [] },
});
export const Product = mongoose.model("Product", productSchema);
