import { Router } from "express";
import { getAllUsersData, updateUser } from "./controller";
const router = Router();

router.get("/", getAllUsersData);
router.put("/:phone", updateUser);

export default router;
