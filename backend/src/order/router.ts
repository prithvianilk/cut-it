import { Router } from "express";
import { getAndSaveOrders, getData } from "./controller";

const router = Router();

router.get("/:mobile", getData);
router.post("/", getAndSaveOrders);

export default router;
