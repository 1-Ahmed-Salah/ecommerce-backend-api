import { Router } from "express";
import { protect, validateRequest } from "../middlewares";
import { createCartValidate, updateQuantityValidate } from "../validators";
import { addItemToCart, changeQuantity, deleteItemFromCart, getCart } from "../controllers/cart.controller";

const router = Router();

router.route("/")
    .get(
        protect,
        getCart
    )
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
