import { Router } from "express";
import { createTradingEntry, getTradingEntries } from "../controllers/bitacora.controller";
import {
  getTradingEntryById,
  updateTradingEntry,
  deleteTradingEntry
} from "../controllers/bitacora.controller";

const router = Router();

router.post("/", createTradingEntry);
router.get("/", getTradingEntries);
router.get("/:id", getTradingEntryById);
router.put("/:id", updateTradingEntry);
router.delete("/:id", deleteTradingEntry);

export default router;