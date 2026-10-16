import { Router } from "express";
import { protect } from "../middlewares";
import { cancelOrder, createOrder, getOrderById, listOrder } from "../controllers/orders.controller";

const router = Router();

router.route('/')
    .get(
        protect,
        listOrder
    )
    .post(
        protect,
        createOrder
    )

router.route('/:id')
    .put(
        protect,
        cancelOrder
    )
    .get(
        protect,
        getOrderById
    )

export default router;
