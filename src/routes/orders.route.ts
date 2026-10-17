import { Router } from "express";
import { protect, RBAC } from "../middlewares";
import { cancelOrder, changeStatus, createOrder, getOrderById, listAllOrders, listOrder, listUserOrders } from "../controllers/orders.controller";
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

router.route('/listUserOrders/:id')
    .get(
        protect,
        RBAC(USER_ROLE.ADMIN),
        listUserOrders
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

router.route('/change-status/:id')
    .put(
        protect,
        RBAC(USER_ROLE.ADMIN),
        changeStatus
    )

export default router;
