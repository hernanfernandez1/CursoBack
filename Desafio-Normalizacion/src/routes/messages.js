import { Router } from "express";
import { getMessages, getNormalizedMessages, getDenormalizedMessages } from "../controllers/messages.js";
const router = Router();

router.get("/", getMessages);
router.get("/normalize", getNormalizedMessages);
router.get("/denormalize", getDenormalizedMessages);

export default router;
