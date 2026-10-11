import { Router } from "express";
import { protect, RBAC, validateRequest } from "../middlewares";
import { createProduct, deleteProduct, getProductById, listProducts, updaateProduct } from "../controllers/products.controller";
import { USER_ROLE } from "../../generated/prisma/enums";
import { createProductValidate, updateProductValidate } from "../validators";

const router = Router();

router.route('/')
    .get(
        protect,
        listProducts
    )
    .post(
        protect, 
        RBAC(USER_ROLE.ADMIN),
        validateRequest(createProductValidate),
        createProduct
    )

router.route('/:id')
    .get(
        protect,
        getProductById
    )
    .put(
        protect,
        RBAC(USER_ROLE.ADMIN),
        validateRequest(updateProductValidate),
        updaateProduct
    )
    .delete(
        protect,
        RBAC(USER_ROLE.ADMIN),
        deleteProduct
    )


export default router;
