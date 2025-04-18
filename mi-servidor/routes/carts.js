import { Ticket } from "../models/Ticket.js";
import { Cart } from "../models/Cart.js";
import { Product } from "../models/Product.js";

router.post("/:cid/purchase", current, authorize(["user"]), async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid).populate("products.product");
    if (!cart) return res.status(404).json({ message: "Carrito no encontrado" });

    const productsToBuy = [];
    const productsNotAvailable = [];
    let totalAmount = 0;

    for (const item of cart.products) {
      const product = item.product;
      const quantity = item.quantity;

      if (product.stock >= quantity) {
        product.stock -= quantity;
        await product.save();

        totalAmount += product.price * quantity;
        productsToBuy.push(item);
      } else {
        productsNotAvailable.push(product._id);
      }
    }

    // Generar ticket
    const ticket = await Ticket.create({
      amount: totalAmount,
      purchaser: req.user.email
    });

    // Filtrar productos no disponibles para dejar en el carrito
    cart.products = cart.products.filter(p =>
      productsNotAvailable.includes(p.product._id.toString())
    );
    await cart.save();

    res.json({
      status: "success",
      ticket,
      notProcessedProducts: productsNotAvailable
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
