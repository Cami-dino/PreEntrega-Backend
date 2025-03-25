const express = require('express');
const Cart = require('../models/Cart');
const router = express.Router();

// GET: Obtener un carrito con productos completos
router.get('/:cid', async (req, res, next) => {
    try {
        const cart = await Cart.findById(req.params.cid).populate('products.product');
        res.json(cart);
    } catch (err) {
        next(err);
    }
});

// POST: Crear un nuevo carrito
router.post('/', async (req, res, next) => {
    try {
        const newCart = await Cart.create({ products: [] });
        res.json(newCart);
    } catch (err) {
        next(err);
    }
});

// POST: Agregar producto al carrito
router.post('/:cid/product/:pid', async (req, res, next) => {
    try {
        const { cid, pid } = req.params;
        const cart = await Cart.findById(cid);

        const productIndex = cart.products.findIndex(p => p.product.toString() === pid);
        if (productIndex !== -1) {
            cart.products[productIndex].quantity++;
        } else {
            cart.products.push({ product: pid, quantity: 1 });
        }

        await cart.save();
        res.json(cart);
    } catch (err) {
        next(err);
    }
});

// DELETE: Vaciar carrito
router.delete('/:cid', async (req, res, next) => {
    try {
        const cart = await Cart.findByIdAndUpdate(req.params.cid, { products: [] }, { new: true });
        res.json(cart);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
