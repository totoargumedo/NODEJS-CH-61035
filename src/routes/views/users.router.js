import { Router } from "express";

const usersRouter = Router();

usersRouter.get("/register", async (req, res, next) => {
  try {
    res.render("register");
  } catch (error) {
    next(error);
  }
});

export default usersRouter;
