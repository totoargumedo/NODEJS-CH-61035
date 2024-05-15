import { Router } from "express";

const errorsRouter = Router();

errorsRouter.get("/404", async (req, res, next) => {
  try {
    res.render("404");
  } catch (error) {
    next(error);
  }
});

export default errorsRouter;
