import { Router } from "express";
import { login, register } from "../controllers/auth.controller";
import { validateRequest } from "../middlewares/validateRequest.middleware";
import { loginValidate, registerValidate } from "../validators/auth.validator";

const router = Router();

router.post('/register', validateRequest(registerValidate), register);
router.post('/login', validateRequest(loginValidate), login);

export default router;
