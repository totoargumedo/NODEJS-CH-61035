import { Router } from "express";
import * as cartsControllers from "../../controllers/carts.controller.js";

const cartsRouter = Router();

//Devuelve todos los productos
cartsRouter.get("/", cartsControllers.getAll);

//Crear carrito
cartsRouter.post("/", cartsControllers.create);

//Devuelve producto por id
cartsRouter.get("/:cid", cartsControllers.getById);

//Agregar productos a un carrito
cartsRouter.put("/:cid/product/:pid", cartsControllers.addProductsToCart);

//Eliminar productos de un carrito
cartsRouter.delete("/:cid/product/:pid", cartsControllers.removeProductsInCart);

//Eliminar carrito
cartsRouter.delete("/:cid", cartsControllers.remove);

//Limpiar carito
cartsRouter.delete("/:cid/clean", cartsControllers.cleanCart);

export default cartsRouter;
