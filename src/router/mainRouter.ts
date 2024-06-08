import { Router } from "express";
import tryCatch from "../utils/tryCatch";
import { sendPhoneNumber } from "../controller/sendPhoneOTP";
import { resignation } from "../controller/resignation";
import { resignationValidator } from "../validator/resignationValidator";
import {
  accountLogin,
  accountResignation,
  profile,
} from "../controller/accountController";
import { statelessAuth } from "../middleware/statelessAuth";
import { stateFullAuth } from "../middleware/stateFullAuth";

const router = Router();

router.post("/", tryCatch(sendPhoneNumber));

router.post("/resignation", resignationValidator, tryCatch(resignation));

router.post("/account_resignation", tryCatch(accountResignation));

router.post("/account_login", tryCatch(accountLogin));

router.get("/stateless_auth/user/profile", statelessAuth, tryCatch(profile));

router.get("/statFull_auth/user/profile", stateFullAuth, tryCatch(profile));

export default router;
