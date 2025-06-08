import { Router } from "express";
import { getAIAnalysisFromRealNews } from "../controllers/news.controller";

const router = Router();

router.get("/news", getAIAnalysisFromRealNews);

export default router;