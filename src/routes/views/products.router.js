import { Router } from "express";
import * as productsServices from "../../services/products.services.js";

const productRouter = Router();

productRouter.get("/", async (req, res, next) => {
  try {
    const productsAll = await productsServices.getAll();
    res.render("products", { products: productsAll });
  } catch (error) {
    next(error);
  }
});

productRouter.get("/realtimeproducts", async (req, res, next) => {
  try {
    res.render("realtimeproducts");
  } catch (error) {
    next(error);
  }
});

productRouter.get("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const productOne = await productsServices.getById(pid);
    res.render("product", { productOne });
  } catch (error) {
    next(error);
  }
});

export default productRouter;
