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

/**
 * @desc    Delete user address
 * @route   DELETE /api/v1/addresses/:id
 * @access  Private (user himself)
 */
export const deleteAddress = asyncHandler(async(req, res, next)=> {
    const { id } = req.params;

    const addressExists = await prisma.address.findUnique({ where: { id } });
    if(!addressExists) {
        return next(new ApiError("Address not found", 404));
    }

    if(req.user.id !== addressExists.userId) {
        return next(new ApiError("Unauthorized", 403));
    }

    const deletedAddress = await prisma.address.delete({ where: { id: addressExists.id } });

    res.status(200).json({
        success: true,
        message: "address deleted successfully",
        data: {
            address: {
                id: deletedAddress.id
            }
        }
    })
})

/**
 * @desc    List the addresses
 * @route   GET /api/v1/addresses
 * @access  Private (user himself)
 */
export const listAddresses = asyncHandler(async(req, res, next)=> {

    const userId = req.user.id;

    const addresses = await prisma.address.findMany({
        where: { userId }
    })

    res.status(200).json({
        success: true,
        data: {
            addresses
        }
    })
})

