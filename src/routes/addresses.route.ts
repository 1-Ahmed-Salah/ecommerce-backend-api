import { Router } from "express";
import { protect, validateRequest } from "../middlewares";
import { addAddress, deleteAddress, listAddresses } from "../controllers/addresses.controller";
import { createAddressValidate } from "../validators";

const router = Router();

router.route('/')
    .get(
        protect,
        listAddresses
    )
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
