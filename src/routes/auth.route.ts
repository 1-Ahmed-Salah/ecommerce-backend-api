import { Router } from "express";
import { getMe, login, register } from "../controllers/auth.controller";
import { protect, validateRequest } from "../middlewares";
import { loginValidate, registerValidate } from "../validators";

const router = Router();

router.post(
    '/register', 
    validateRequest(registerValidate), 
    register
);

router.post(
    '/login', 
    validateRequest(loginValidate), 
    login
);

router.get(
    '/me', 
    protect, 
    getMe
);

export default router;
