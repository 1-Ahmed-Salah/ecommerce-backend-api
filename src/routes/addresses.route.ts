import { Router } from "express";
import { protect, validateRequest } from "../middlewares";
import { addAddress } from "../controllers/addresses.controller";
import { createAddressValidate } from "../validators";

const router = Router();

router.route('/')
    .post(
        protect, 
        validateRequest(createAddressValidate), 
        addAddress
    )

export default router;
