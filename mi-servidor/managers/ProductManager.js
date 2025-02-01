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

    async getProductById(id) {
        const products = await this.getProducts();
        return products.find(prod => prod.id === id) || null;
    }

    async addProduct(product) {
        const products = await this.getProducts();
        const newProduct = { id: Date.now().toString(), ...product };
        products.push(newProduct);
        await fs.writeFile(path, JSON.stringify(products, null, 2));
        return newProduct;
    }

    async updateProduct(id, updatedFields) {
        let products = await this.getProducts();
        const index = products.findIndex(prod => prod.id === id);
        if (index === -1) return null;
        products[index] = { ...products[index], ...updatedFields };
        await fs.writeFile(path, JSON.stringify(products, null, 2));
        return products[index];
    }

    async deleteProduct(id) {
        let products = await this.getProducts();
        products = products.filter(prod => prod.id !== id);
        await fs.writeFile(path, JSON.stringify(products, null, 2));
    }
}

module.exports = ProductManager;
