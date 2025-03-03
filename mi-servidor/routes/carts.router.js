const express = require('express');
const Cart = require('../models/Cart');
const router = express.Router();

//  Obtener un carrito con los productos completos
router.get('/:cid', async (req, res) => {
    const cart = await Cart.findById(req.params.cid).populate('products.product');
    res.json(cart);
});

//  Crear un nuevo carrito
router.post('/', async (req, res) => {
    const newCart = await Cart.create({ products: [] });
    res.json(newCart);
});

//  Agregar producto al carrito
router.post('/:cid/product/:pid', async (req, res) => {
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
});

//  Actualizar todos los productos del carrito
router.put('/:cid', async (req, res) => {
    const { products } = req.body;
    const cart = await Cart.findByIdAndUpdate(req.params.cid, { products }, { new: true });
    res.json(cart);
});

//  Actualizar la cantidad de un producto en el carrito
router.put('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const cart = await Cart.findById(cid);

    const product = cart.products.find(p => p.product.toString() === pid);
    if (product) product.quantity = quantity;

    await cart.save();
    res.json(cart);
});

//  Eliminar un producto del carrito
router.delete('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const cart = await Cart.findByIdAndUpdate(cid, { $pull: { products: { product: pid } } }, { new: true });
    res.json(cart);
});

//  Vaciar carrito
router.delete('/:cid', async (req, res) => {
    const cart = await Cart.findByIdAndUpdate(req.params.cid, { products: [] }, { new: true });
    res.json(cart);
});

module.exports = router;
