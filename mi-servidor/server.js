import { Server } from "socket.io";

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("Cliente conectado");

  socket.on("productoNuevo", (producto) => {
    io.emit("actualizarProductos", producto);
  });

  socket.on("productoEliminado", (id) => {
    io.emit("eliminarProducto", id);
  });

  socket.on("productoAgregadoAlCarrito", (producto) => {
    io.emit("actualizarCarrito", producto);
  });
});
