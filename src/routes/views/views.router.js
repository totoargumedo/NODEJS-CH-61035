import { Router } from "express";
import { products } from "../../instances/products.js";
import productRouter from "./products.router.js";
import errorsRouter from "./errors.router.js";

const viewsRouter = Router();

viewsRouter.get("/", async (req, res, next) => {
  try {
    const productsAll = await products.getProducts();
    res.status(200).render("products", { products: productsAll });
  } catch (error) {
    next(error);
  }
});

viewsRouter.use("/products", productRouter);
viewsRouter.use("/errors", errorsRouter);

export default viewsRouter;
