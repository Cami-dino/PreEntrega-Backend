const express = require('express');
const ProductManager = require('../managers/ProductManager');
const router = express.Router();
const productManager = new ProductManager();

// Vista estática con productos
router.get('/products', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('index', { products });
});

// Vista en tiempo real con WebSockets
router.get('/realtimeproducts', async (req, res) => {
    res.render('realTimeProducts');
});

module.exports = router;
