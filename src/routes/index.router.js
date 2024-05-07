import { Router } from "express";
import apiRouter from "./api/api.router.js";

const router = Router();

router.use("/api", apiRouter);

router.get("/", (req, res) => {
  res.status(200).send("<h1>It Works!</h1>");
});

export default router;
