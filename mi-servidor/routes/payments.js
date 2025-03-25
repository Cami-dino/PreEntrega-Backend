import express from "express";
import Stripe from "stripe";
import { Order } from "../models/Order.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();
const stripe = new Stripe("sk_test_tuClaveSecreta");

router.post("/checkout", authMiddleware, async (req, res) => {
  const { products, total } = req.body;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: products.map(p => ({
      price_data: {
        currency: "usd",
        product_data: { name: p.title },
        unit_amount: p.price * 100,
      },
      quantity: p.quantity,
    })),
    mode: "payment",
    success_url: "http://localhost:8080/success",
    cancel_url: "http://localhost:8080/cancel",
  });

  await new Order({ userId: req.user.id, products, total, status: "pendiente" }).save();

  res.json({ url: session.url });
});

export default router;
