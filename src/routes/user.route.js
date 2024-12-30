import express from "express";
import { userLogin, userRegister } from "../controller/user.controller.js";
import { validateRegister } from "../middleware/userValidation.js";

const router = express.Router();

router.post("/user-register", validateRegister, userRegister);
router.post("/user-login", validateRegister, userLogin);

export default router;
