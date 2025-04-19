import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import path from "path";
import productsRouter from "./routes/products.js";
import cartsRouter from "./routes/carts.js";
import viewsRouter from "./routes/views.router.js";
import authRouter from "./routes/auth.js";
app.use("/auth", authRouter);
import { errorHandler } from "./middlewares/errorHandler.js";
app.use(errorHandler);
import paymentsRouter from "./routes/payments.js";
app.use("/api/payments", paymentsRouter);
import { errorHandler } from "./middlewares/errorHandler.js";
app.use(errorHandler);
import session from "express-session";
import MongoStore from "connect-mongo";

app.use(session({
  secret: "tuClaveUltraSecreta123",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    ttl: 3600
  })
}));

router.post("/", uploader.array("thumbnails", 5), async (req, res) => {
  const thumbnails = req.files.map(f => `/img/${f.filename}`);
  const newProduct = { ...req.body, thumbnails };
  const saved = await Product.create(newProduct);
  res.json(saved);
});

dotenv.config();
import app from express();
import httpServer from createServer(app);
import io from new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch(err => console.error("❌ Error conectando a MongoDB:", err));

app.engine("handlebars", handlebars());
app.set("view engine", "handlebars");
app.set("views", path.join(path.resolve(), "views"));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/auth", authRouter);
app.use("/", viewsRouter);

io.on("connection", socket => {
  console.log("Cliente conectado");

  socket.on("productoNuevo", (producto) => {
    io.emit("actualizarProductos", producto);
  });

  socket.on("productoEliminado", (id) => {
    io.emit("eliminarProducto", id);
  });
});

const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
