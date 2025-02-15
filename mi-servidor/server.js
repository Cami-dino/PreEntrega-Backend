
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { engine } = require('express-handlebars');
const path = require('path');
const ProductManager = require('./managers/ProductManager');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const productManager = new ProductManager();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Configurar Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Rutas de vistas
const viewsRouter = require('./routes/views.router');
app.use('/', viewsRouter);

// WebSockets
io.on('connection', async (socket) => {
    console.log('🟢 Cliente conectado');

    // Enviar productos al conectar
    const products = await productManager.getProducts();
    socket.emit('updateProducts', products);

    // Escuchar cuando se agrega un producto
    socket.on('newProduct', async (product) => {
        const newProduct = await productManager.addProduct(product);
        io.emit('updateProducts', await productManager.getProducts());
    });

    // Escuchar cuando se elimina un producto
    socket.on('deleteProduct', async (id) => {
        await productManager.deleteProduct(id);
        io.emit('updateProducts', await productManager.getProducts());
    });

    socket.on('disconnect', () => {
        console.log('🔴 Cliente desconectado');
    });
});

// Iniciar servidor
const PORT = 8080;
httpServer.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
