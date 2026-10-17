import Router from "express";
import { protect, RBAC, validateRequest } from "../middlewares";
import { updateUserValidate } from "../validators/user.validator";
import { changeUserRole, getUserById, listUsers, updateUser } from "../controllers/users.controller";
import { USER_ROLE } from "../../generated/prisma/enums";

const router = Router();

router.route('/')
    .get(
        protect,
        RBAC(USER_ROLE.ADMIN),
        listUsers
    )
    .put(
        protect,
        validateRequest(updateUserValidate),
        updateUser
    )

router.route('/:id')
    .get(
        protect,
        RBAC(USER_ROLE.ADMIN),
        getUserById
    )
    .put(
        protect,
        RBAC(USER_ROLE.ADMIN),
        changeUserRole
    )

export default router;
