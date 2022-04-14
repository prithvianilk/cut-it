import { Router } from "express";
import { getNutritionData, getRecommendations } from "./controller";

const router = Router();

router.post("/nutrition", getNutritionData);
router.get("/:phone", getRecommendations);

export default router;
