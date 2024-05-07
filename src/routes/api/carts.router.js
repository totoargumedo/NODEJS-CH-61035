import { Router } from "express";
import { carts } from "../../instances/carts.js";

const cartsRouter = Router();

//Devuelve todos los productos
cartsRouter.get("/", async (req, res, next) => {
  try {
    const cartsAll = await carts.getCarts();
    res.status(200).json({ status: "success", data: cartsAll });
  } catch (error) {
    next(error);
  }
});

//Crear carrito
cartsRouter.post("/", async (req, res, next) => {
  try {
    const newCart = await carts.newCart();
    res.status(201).json({ status: "success", data: newCart });
  } catch (error) {
    next(error);
  }
});

//Devuelve producto por id
cartsRouter.get("/:cid", async (req, res, next) => {
  try {
    const { cid } = req.params;
    const cartFound = await carts.getCartById(cid);
    if (cartFound.error) {
      return res.status(404).json({ status: "error", data: cartFound.error });
    }
    res.status(200).json({ status: "success", data: cartFound });
  } catch (error) {
    next(error);
  }
});

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
    const cartUpdated = await carts.removeProductFromCart(cid, pid);
    if (cartUpdated.error) {
      return res.status(404).json({ status: "error", data: cartUpdated.error });
    }
    res.status(201).json({ status: "success", data: cartUpdated });
  } catch (error) {
    next(error);
  }
});

//Eliminar carrito
cartsRouter.delete("/:cid", async (req, res, next) => {
  try {
    const { cid } = req.params;
    const cartDeleted = await carts.deleteCart(cid);
    if (cartDeleted.error) {
      return res.status(404).json({ status: "error", data: cartDeleted.error });
    }
    res.status(200).json({ status: "success", data: cartDeleted });
  } catch (error) {
    next(error);
  }
});

export default cartsRouter;
