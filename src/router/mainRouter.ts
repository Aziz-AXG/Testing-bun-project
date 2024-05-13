import { Router } from "express";
import tryCatch from "../utils/tryCatch";
import { sendPhoneNumber } from "../controller/sendPhoneOTP";
import { resignation } from "../controller/resignation";
import { resignationValidator } from "../validator/resignationValidator";

const router = Router();

router.post("/", tryCatch(sendPhoneNumber));

router.post("/resignation", resignationValidator, tryCatch(resignation));

export default router;
