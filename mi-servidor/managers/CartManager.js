const fs = require('fs').promises;
const path = './data/carts.json';

class CartManager {
    async getCarts() {
        try {
            const data = await fs.readFile(path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async createCart() {
        const carts = await this.getCarts();
        const newCart = { id: Date.now().toString(), products: [] };
        carts.push(newCart);
        await fs.writeFile(path, JSON.stringify(carts, null, 2));
        return newCart;
    }

    async getCartById(id) {
        const carts = await this.getCarts();
        return carts.find(cart => cart.id === id) || null;
    }

    async addProductToCart(cartId, productId) {
        const carts = await this.getCarts();
        const cart = carts.find(cart => cart.id === cartId);
        if (!cart) return null;

        const product = cart.products.find(prod => prod.product === productId);
        if (product) {
            product.quantity += 1;
        } else {
            cart.products.push({ product: productId, quantity: 1 });
        }

        await fs.writeFile(path, JSON.stringify(carts, null, 2));
        return cart;
    }
}

module.exports = CartManager;
