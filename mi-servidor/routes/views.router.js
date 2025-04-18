router.get("/carts/:cid", async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.cid).populate("products.product").lean();
        if (!cart) return res.status(404).send("Carrito no encontrado");

        res.render("cart", { products: cart.products });
    } catch (err) {
        res.status(500).send("Error al mostrar el carrito");
    }
});

router.get("/products/:pid", async (req, res) => {
    const product = await Product.findById(req.params.pid).lean();
    if (!product) return res.status(404).send("Producto no encontrado");
    res.render("productDetail", { product });
});
router.get("/tickets", current, authorize(["admin"]), async (req, res) => {
    const tickets = await Ticket.find().lean();
    res.render("tickets", { tickets });
  });
  router.get("/admin", current, authorize(["admin"]), (req, res) => {
    res.render("adminDashboard");
  });
  router.get("/products", async (req, res) => {
    const { category, available, page = 1, limit = 10 } = req.query;
  
    let filter = {};
    if (category) filter.category = category;
    if (available) filter.stock = { $gt: 0 };
  
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      lean: true
    };
  
    const result = await Product.paginate(filter, options);
    res.render("products", { products: result.docs, pagination: result });
  });
  