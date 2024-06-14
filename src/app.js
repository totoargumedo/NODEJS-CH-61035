import express from "express";
import "dotenv/config";
import { initMongo } from "./dao/mongo/connection.js";
import morgan from "morgan";
import { __dirname } from "./utils.js";
import router from "./routes/index.router.js";
import { errorHandler } from "./middlewares/error.handler.js";
import handlebars from "express-handlebars";
import { notFoundHandler } from "./middlewares/notFound.handler.js";
import { Server } from "socket.io";
import * as productsServices from "./services/products.services.js";
import * as messagesServices from "./services/messages.services.js";

const app = express();
const PORT = process.env.PORT || 8080;

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//ROUTERS
app.use(express.static(__dirname + "/public"));
app.use("/", router);

//RENDER ENGINE
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

//MIDDLEWARES 2
app.use(notFoundHandler);
app.use(errorHandler);

//PERSISTENCIA
if (process.env.PERSISTENCE === "MONGODB") {
  initMongo();
}

//INICIALIZAR SERVIDOR

const httpServer = app.listen(PORT, () => {
  console.log("🚀 Server running on port " + PORT + "...");
});

//SOCKET SERVER
export const socketServer = new Server(httpServer);

socketServer.on("connection", async (socket) => {
  console.log("🟢 New connection: " + socket.id);

  //Products sockets
  socketServer.emit("productsAll", await productsServices.getAll(false));

  socket.on("newProduct", async (data) => {
    socket.broadcast.emit("newProductToast", data);
    socketServer.emit("productsAll", await productsServices.getAll(false));
  });

  socket.on("productDeleted", async (data) => {
    socket.broadcast.emit("productDeletedToast", data);
    socketServer.emit("productsAll", await productsServices.getAll(false));
  });

  //Messages sockets
  socketServer.emit("messages", await messagesServices.getAll());

  socket.on("newMessage", async (data) => {
    await messagesServices.create(data);
    socketServer.emit("messages", await messagesServices.getAll());
  });

  socket.on("newUser", (user) => {
    socket.broadcast.emit("newUser", user);
  });

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected: " + socket.id);
  });
});
