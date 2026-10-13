import { Router } from "express";
import { protect, validateRequest } from "../middlewares";
import { addAddress, deleteAddress } from "../controllers/addresses.controller";
import { createAddressValidate } from "../validators";

const router = Router();

router.route('/')
    .post(
        protect, 
        validateRequest(createAddressValidate), 
        addAddress
    )

router.route('/:id')
    .delete(
        protect,
        deleteAddress
    )

export default router;
