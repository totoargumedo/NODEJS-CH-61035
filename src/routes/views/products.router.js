import { Router } from "express";

const productRouter = Router();

productRouter.get("/", async (req, res, next) => {
  try {
    res.render("products", { products: [] });
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

export default productRouter;
