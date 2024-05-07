import { Router } from "express";
import { products } from "../../instances/products.js";

const productsRouter = Router();

//Devuelve todos los productos
productsRouter.get("/", async (req, res, next) => {
  try {
    const { limit } = req.query;
    const productsAll = await products.getProducts();
    if (limit) {
      return res
        .status(200)
        .json({ status: "success", data: productsAll.slice(0, limit) });
    }
    res.status(200).json({ status: "success", data: productsAll });
  } catch (error) {
    next(error);
  }
});

//Devuelve producto por id
productsRouter.get("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const productFound = await products.getProductById(pid);

    if (productFound.error) {
      return res
        .status(404)
        .json({ status: "error", data: productFound.error });
    }
    res.status(200).json({ status: "success", data: founded });
  } catch (error) {
    next(error);
  }
});

//Crear nuevo producto
productsRouter.post("/", async (req, res) => {});

export default productsRouter;
