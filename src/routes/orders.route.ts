import { Router } from "express";
import { protect, RBAC } from "../middlewares";
import { cancelOrder, createOrder, getOrderById, listAllOrders, listOrder } from "../controllers/orders.controller";
import { USER_ROLE } from "../../generated/prisma/enums";

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

router.route('/allOrders')
    .get(
        protect,
        RBAC(USER_ROLE.ADMIN),
        listAllOrders
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
