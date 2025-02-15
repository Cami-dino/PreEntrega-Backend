const socket = io();
const productList = document.getElementById('product-list');
const form = document.getElementById('product-form');

socket.on('updateProducts', (products) => {
    productList.innerHTML = '';
    products.forEach(product => {
        const li = document.createElement('li');
        li.innerHTML = `${product.title} - ${product.price} USD 
                        <button onclick="deleteProduct('${product.id}')">Eliminar</button>`;
        productList.appendChild(li);
    });
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const price = document.getElementById('price').value;
    socket.emit('newProduct', { title, price });
    form.reset();
});

function deleteProduct(id) {
    socket.emit('deleteProduct', id);
}
