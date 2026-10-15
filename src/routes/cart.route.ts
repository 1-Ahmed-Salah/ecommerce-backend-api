import { Router } from "express";
import { protect, validateRequest } from "../middlewares";
import { createCartValidate } from "../validators";
import { addItemToCart } from "../controllers/cart.controller";

const router = Router();

router.route("/")
    .post(
        protect,
        validateRequest(createCartValidate),
        addItemToCart
    )

export default router;
