import { Router } from "express";

const messagesRouter = Router();

messagesRouter.get("/", async (req, res, next) => {
  try {
    res.render("chat");
  } catch (error) {
    next(error);
  }
});

export default messagesRouter;
