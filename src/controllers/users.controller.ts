import { asyncHandler, ApiError } from "../utils";
import { prisma } from "../config/db";
import { Address } from "../../generated/prisma/client";

/**
 * @desc    Update user
 * @route   PUT /api/v1/users
 * @access  Private (user himself)
 */
export const updateUser = asyncHandler(async(req, res, next)=> {

    const userId = req.user.id;

    let shippingAddress: Address | null = null; 
    let billingAddress: Address | null = null;

    const {defaultShippingAddress, defaultBillingAddressId} = req.body;

    if(defaultShippingAddress) {
        shippingAddress = await prisma.address.findUnique({
            where: {
                id: defaultShippingAddress
            }
        })

        if(!shippingAddress) {
            return next(new ApiError("Shipping address not found", 404));
        }

        if(shippingAddress.userId !== userId) {
            return next(new ApiError("Address does not belong to user", 401));
        }
    }

    if(defaultBillingAddressId) {
        billingAddress = await prisma.address.findUnique({
            where: {
                id: defaultBillingAddressId
            }
        })

        if(!billingAddress) {
            return next(new ApiError("Billing address not found", 404));
        }

        if(billingAddress.userId !== userId) {
            return next(new ApiError("Address does not belong to user", 401));
        }

    }

    const user = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            ...req.body
        }
    })

    res.status(200).json({
        success: true,
        message: "user updated successfully"
    })
})

