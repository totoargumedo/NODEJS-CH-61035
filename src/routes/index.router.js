import { Router } from "express";
import apiRouter from "./api/api.router.js";
import viewsRouter from "./views/views.router.js";

const router = Router();

router.use("/", viewsRouter);
router.use("/api", apiRouter);

export default router;
