import { Router } from "express";
import { protect } from "../middlewares";
import { createOrder } from "../controllers/orders.controller";

const router = Router();

router.route('/')
    .post(
        protect,
        createOrder
    )

export default router;
