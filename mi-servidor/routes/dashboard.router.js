router.get("/api/dashboard/data", async (req, res) => {
    const tickets = await Ticket.find().populate("products.product");
    const productSales = {};
  
    tickets.forEach(ticket => {
      ticket.products.forEach(p => {
        const id = p.product._id;
        productSales[id] = (productSales[id] || 0) + p.quantity;
      });
    });
  
    const productList = await Product.find({ _id: { $in: Object.keys(productSales) } });
    const labels = productList.map(p => p.title);
    const sales = productList.map(p => productSales[p._id]);
  
    res.json({ labels, sales });
  });
  