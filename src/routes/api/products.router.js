import { Router } from "express";
import { products } from "../../instances/products.js";
import { productValidator } from "../../middlewares/product.validator.js";

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
    res.status(200).json({ status: "success", data: productFound });
  } catch (error) {
    next(error);
  }
});

//Crear nuevo producto
productsRouter.post("/", productValidator, async (req, res, next) => {
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

//Actualizar producto
productsRouter.put("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const { body } = req;

    const productUpdated = await products.updateProduct(pid, body);
    if (productUpdated.error) {
      return res
        .status(400)
        .json({ status: "error", data: productUpdated.error });
    }
    res.status(200).json({ status: "success", data: productUpdated });
  } catch (error) {
    next(error);
  }
});

//Eliminar producto
productsRouter.delete("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const productDeleted = await products.deleteProduct(pid);
    console.log(productDeleted);
    if (productDeleted.error) {
      return res
        .status(404)
        .json({ status: "error", data: productDeleted.error });
    }
    res.status(200).json({ status: "success", data: productDeleted });
  } catch (error) {
    next(error);
  }
});

export default productsRouter;
