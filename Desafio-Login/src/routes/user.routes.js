import { Router } from "express";
const router = Router();
import { login, logout, infoSession, getSession } from "../controllers/user.controllers.js";
import { validateLogin } from "../middlewares/middlewares.js";

router.post("/login", login);

router.get("/", getSession);

router.get("/home", validateLogin, infoSession);

router.get("/logout", logout);

export default router;
