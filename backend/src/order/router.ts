import { Router } from "express";
import { getOrders } from "./controller";

const router = Router();

router.get("/", getOrders);

export default router;
