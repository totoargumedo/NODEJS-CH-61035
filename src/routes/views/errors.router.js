import { Router } from "express";

const errorsRouter = Router();

errorsRouter.get("/404", async (req, res, next) => {
  try {
    res.render("404", {
      user: req.session.user,
    });
  } catch (error) {
    next(error);
  }
});

errorsRouter.get("/403", async (req, res, next) => {
  try {
    res.render("403", {
      user: req.session.user,
    });
  } catch (error) {
    next(error);
  }
});

errorsRouter.get("/login-error", async (req, res, next) => {
  try {
    res.render("login-error", {
      user: req.session.user,
    });
  } catch (error) {
    next(error);
  }
});

errorsRouter.get("/register-error", async (req, res, next) => {
  try {
    res.render("register-error", {
      user: req.session.user,
    });
  } catch (error) {
    next(error);
  }
});

export default errorsRouter;
