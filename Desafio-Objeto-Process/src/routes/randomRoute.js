import { Router } from "express";
const router = Router();
import { randomNumbers } from "../controllers/randomController.js";

router.get("/randoms/:cant", randomNumbers);
router.get("/randoms/", randomNumbers);

export default router;
