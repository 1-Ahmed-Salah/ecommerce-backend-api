import { Router } from "express";
import { protect, validateRequest } from "../middlewares";
import { createCartValidate, updateQuantityValidate } from "../validators";
import { addItemToCart, changeQuantity, deleteItemFromCart } from "../controllers/cart.controller";

const router = Router();

router.route("/")
    .post(
        protect,
        validateRequest(createCartValidate),
        addItemToCart
    )

router.route("/:id")
    .put(
        protect,
        validateRequest(updateQuantityValidate),
        changeQuantity
    )
    .delete(
        protect,
        deleteItemFromCart
    )

export default router;
