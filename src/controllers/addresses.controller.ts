import { asyncHandler, ApiError } from "../utils";
import { prisma } from "../config/db";

/**
 * @desc    Add user address
 * @route   POST /api/v1/addresses
 * @access  Private (user logged in)
 */
export const addAddress = asyncHandler(async(req, res, next)=> {
    
    const address = await prisma.address.create({
        data: {
            ...req.body,
            userId: req.user.id
        }
    })
    if(!address) {
        return next(new ApiError("somrthing went wrong", 400));
    }

    res.status(201).json({
        success: true,
        message: "address added successfully",
        data: {
            address
        }
    })
})


