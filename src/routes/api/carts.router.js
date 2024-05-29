import { Router } from "express";
import * as cartsControllers from "../../controllers/carts.controller.js";

const cartsRouter = Router();

//Devuelve todos los productos
cartsRouter.get("/", cartsControllers.getAll);

//Crear carrito
cartsRouter.post("/", cartsControllers.create);

//Devuelve producto por id
cartsRouter.get("/:cid", cartsControllers.getById);

//Crear nuevo producto
cartsRouter.post("/", async (req, res, next) => {
  try {
    const { body } = req;
    const newProduct = await products.addProduct(body);
    if (newProduct.error) {
      return res.status(400).json({ status: "error", data: newProduct.error });
    }
    res.status(201).json({ status: "success", data: newProduct });
  } catch (error) {
    next(error);
  }
});

//Agregar productos a un carrito
cartsRouter.post("/:cid/product/:pid", async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.query;
    const cartUpdated = await carts.addProductsToCart(cid, pid, quantity);
    if (cartUpdated.error) {
      return res.status(404).json({ status: "error", data: cartUpdated.error });
    }
    res.status(201).json({ status: "success", data: cartUpdated });
  } catch (error) {
    next(error);
  }
});

//Eliminar productos de un carrito
cartsRouter.delete("/:cid/product/:pid", async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.query;
    const cartUpdated = await carts.removeProductFromCart(cid, pid, quantity);
    if (cartUpdated.error) {
      return res.status(404).json({ status: "error", data: cartUpdated.error });
    }
    res.status(201).json({ status: "success", data: cartUpdated });
  } catch (error) {
    next(error);
  }
});

//Eliminar carrito
cartsRouter.delete("/:cid", cartsControllers.remove);

export default cartsRouter;
