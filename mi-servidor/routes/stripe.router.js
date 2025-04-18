import stripe from "../services/stripe.js";
import express from "express";
const router = express.Router();

router.post("/create-checkout-session", async (req, res) => {
  const { products } = req.body;

  const lineItems = products.map(p => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: p.title,
        description: p.description,
      },
      unit_amount: p.price * 100,
    },
    quantity: p.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: lineItems,
    success_url: `${req.headers.origin}/success`,
    cancel_url: `${req.headers.origin}/cancel`,
  });

  res.json({ url: session.url });
});
