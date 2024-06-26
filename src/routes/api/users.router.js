import * as usersControllers from "../../controllers/users.controller.js";
import { Router } from "express";

const usersRouter = Router();

usersRouter.post("/register", usersControllers.register);

usersRouter.post("/login", usersControllers.login);

usersRouter.get("/logout", usersControllers.logout);

export default usersRouter;
