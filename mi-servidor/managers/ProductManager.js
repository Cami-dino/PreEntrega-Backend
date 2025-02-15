const fs = require('fs').promises;
const path = './data/products.json';

class ProductManager {
    async getProducts() {
        try {
            const data = await fs.readFile(path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async addProduct(product) {
        const products = await this.getProducts();
        const newProduct = { id: Date.now().toString(), ...product };
        products.push(newProduct);
        await fs.writeFile(path, JSON.stringify(products, null, 2));
        return newProduct;
    }

    async deleteProduct(id) {
        let products = await this.getProducts();
        products = products.filter(prod => prod.id !== id);
        await fs.writeFile(path, JSON.stringify(products, null, 2));
    }
}

module.exports = ProductManager;
