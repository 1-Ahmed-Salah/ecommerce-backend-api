import Router from "express";
import { protect, validateRequest } from "../middlewares";
import { updateUserValidate } from "../validators/user.validator";
import { updateUser } from "../controllers/users.controller";

const router = Router();

router.route('/')
    .put(
        protect,
        validateRequest(updateUserValidate),
        updateUser
    )

export default router;
