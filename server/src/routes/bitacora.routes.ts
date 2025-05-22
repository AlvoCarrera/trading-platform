import { Router } from "express";
import { createTradingEntry, getTradingEntries } from "../controllers/bitacora.controller";

const router = Router();

router.post("/", createTradingEntry);
router.get("/", getTradingEntries)

export default router;