const express = require('express');
const CartManager = require('../managers/CartManager');
const router = express.Router();
const cartManager = new CartManager();

router.post('/', async (req, res) => {
    const newCart = await cartManager.createCart();
    res.status(201).json(newCart);
});

router.get('/:cid', async (req, res) => {
    const cart = await cartManager.getCartById(req.params.cid);
    cart ? res.json(cart) : res.status(404).send('Carrito no encontrado');
});

router.post('/:cid/product/:pid', async (req, res) => {
    const updatedCart = await cartManager.addProductToCart(req.params.cid, req.params.pid);
    updatedCart ? res.json(updatedCart) : res.status(404).send('Carrito no encontrado');
});

module.exports = router;
