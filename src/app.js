import express from "express";
import "dotenv/config";
import morgan from "morgan";
import { __dirname } from "./utils.js";
import router from "./routes/index.router.js";
import { errorHandler } from "./middlewares/error.handler.js";
import handlebars from "express-handlebars";
import { notFoundHandler } from "./middlewares/notFound.handler.js";

const app = express();
const PORT = process.env.PORT || 8080;

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);
app.use(morgan("dev"));

//ROUTERS
app.use(express.static(__dirname + "/public"));
app.use("/", router);
app.use(notFoundHandler);

//RENDER ENGINE
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

//INICIALIZAR SERVIDOR

app.listen(PORT, () => {
  console.log("Server running on port " + PORT + "...");
});
