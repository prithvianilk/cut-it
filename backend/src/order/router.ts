import { Router } from "express";
import { getAndSaveOrders, getData } from "./controller";

const router = Router();

router.get("/", getData);
router.get("/new", getAndSaveOrders);

export default router;
