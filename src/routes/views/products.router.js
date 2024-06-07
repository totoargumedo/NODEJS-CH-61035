import { Router } from "express";
import { products } from "../../instances/products.js";

const productRouter = Router();

productRouter.get("/", async (req, res, next) => {
  try {
    const productsAll = await products.getProducts();
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
    const productOne = await products.getProductById(pid);
    res.render("product", { productOne });
  } catch (error) {
    next(error);
  }
});

export default productRouter;
