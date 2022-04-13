import { Router } from "express";
import { updateUser } from "./controller";
const router = Router();

router.put("/:phone", updateUser);

export default router;
