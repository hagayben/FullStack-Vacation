import express, { Router } from "express";
import validate from "../middlewares/input-validation";
import { login, signup } from "../controllers/auth/controller";
import { loginValidator, signupValidator } from "../controllers/auth/validator";

const router = Router();

router.post("/register", validate(signupValidator), signup);
router.post("/login", validate(loginValidator), login);

export default router;

