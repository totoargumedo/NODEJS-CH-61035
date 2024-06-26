import { Router } from "express";
import * as productsServices from "../../services/products.services.js";
import productRouter from "./products.router.js";
import cartsRouter from "./carts.router.js";
import errorsRouter from "./errors.router.js";
import messagesRouter from "./messages.router.js";
import usersRouter from "./users.router.js";

const viewsRouter = Router();

viewsRouter.get("/", async (req, res, next) => {
  try {
    const productsAll = await productsServices.getAll();
    res.status(200).render("home", {
      user: req.session.user,
      products: productsAll.docs.slice(0, 3),
    });
  } catch (error) {
    next(error);
  }
});

viewsRouter.use("/products", productRouter);
viewsRouter.use("/cart", cartsRouter);
viewsRouter.use("/chat", messagesRouter);
viewsRouter.use("/errors", errorsRouter);
viewsRouter.use("/users", usersRouter);

export default viewsRouter;
