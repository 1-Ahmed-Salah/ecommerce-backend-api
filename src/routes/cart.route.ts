import { Router } from "express";
import { protect, validateRequest } from "../middlewares";
import { createCartValidate } from "../validators";
import { addItemToCart, deleteItemFromCart } from "../controllers/cart.controller";

const router = Router();

router.route("/")
    .post(
        protect,
        validateRequest(createCartValidate),
        addItemToCart
    )

router.route("/:id")
    .delete(
        protect,
        deleteItemFromCart
    )

export default router;
