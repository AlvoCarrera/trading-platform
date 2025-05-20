import { Router } from "express";
import { createBitacoraEntry } from "../controllers/bitacora.controller";

const router = Router();

router.post("/create", createBitacoraEntry);

export default router;