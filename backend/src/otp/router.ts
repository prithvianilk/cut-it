import { Router } from "express";
import { sendOTP, verifyOTP } from "./controller";

const router = Router();

router.post("/send", sendOTP);
router.post("/verify", verifyOTP);

export default router;
