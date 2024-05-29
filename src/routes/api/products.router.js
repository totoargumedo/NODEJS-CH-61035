import { Router } from "express";
import { productValidator } from "../../middlewares/product.validator.js";
import * as productsController from "../../controllers/products.controller.js";

const productsRouter = Router();

//Devuelve todos los productos
productsRouter.get("/", productsController.getAll);

//Devuelve producto por id
productsRouter.get("/:pid", productsController.getById);

//Crear nuevo producto
productsRouter.post("/", productValidator, productsController.create);

//Actualizar producto
productsRouter.put("/:pid", productsController.update);

//Eliminar producto
productsRouter.delete("/:pid", productsController.remove);

export default productsRouter;
