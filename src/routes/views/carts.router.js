import { Router } from "express";
import * as cartsServices from "../../services/carts.services.js";

const cartsRouter = Router();

cartsRouter.get("/:cid", async (req, res, next) => {
  try {
    const { cid } = req.params;
    const cartOne = await cartsServices.getById(cid);
    res.render("cart", {
      products: cartOne.products,
      total: cartOne.cartTotal,

      user: req.session.user,
    });
  } catch (error) {
    next(error);
  }
});

export default cartsRouter;
