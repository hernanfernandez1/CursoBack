import passport from "passport";
import { Router } from "express";
import { signUp, login, getHome, logout } from "../controllers/user.controllers.js";
import { isLoggedIn } from "../middlewares/user.middlewares.js";

const router = Router();

const passportOptions = {
  badRequestMessage: "username / password inválido",
};

router.post("/signup", signUp);

router.post("/login", passport.authenticate("login", passportOptions), login);

router.get("/home", isLoggedIn, getHome);

router.get("/logout", isLoggedIn, logout);

export default router;
