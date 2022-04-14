import { Router } from "express";
import { getData } from "./controller";

const router = Router();

router.get("/:mobile", getData);

export default router;
