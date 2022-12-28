import { Router } from "express";
const router = Router();
import { infoApi } from "../controllers/infoController.js";

router.get("/info", infoApi);

export default router;
