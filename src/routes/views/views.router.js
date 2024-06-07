import { Router } from "express";
import * as productsServices from "../../services/products.services.js";
import productRouter from "./products.router.js";
import errorsRouter from "./errors.router.js";
import messagesRouter from "./messages.router.js";

const viewsRouter = Router();

viewsRouter.get("/", async (req, res, next) => {
  try {
    const productsAll = await productsServices.getAll();
    res.status(200).render("home", {
      active: productsAll[0],
      products: productsAll.slice(1, 4),
    });
  } catch (error) {
    next(error);
  }
});

viewsRouter.use("/products", productRouter);
viewsRouter.use("/chat", messagesRouter);
viewsRouter.use("/errors", errorsRouter);

export default viewsRouter;
