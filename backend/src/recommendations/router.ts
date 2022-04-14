import { Router } from "express";
import { getNutritionData, getRecommendations } from "./controller";

const router = Router();

router.get("/nutrition", getNutritionData);
router.get("/:phone", getRecommendations);

export default router;
