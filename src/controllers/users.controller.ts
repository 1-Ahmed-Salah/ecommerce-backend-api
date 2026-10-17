import { asyncHandler, ApiError } from "../utils";
import { prisma } from "../config/db";
import { Address } from "../../generated/prisma/client";
import { success } from "zod";

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

/**
 * @desc    List users
 * @route   GET /api/v1/users
 * @access  Private (admin)
 */
export const listUsers = asyncHandler(async(req, res, next)=> {

    const page = +req.query.page! || 1;
    const limit = +req.query.limit! || 10;

    const skip = (page -1) * limit;

    const [users, totalUsers] = await Promise.all([
        await prisma.user.findMany({
            skip,
            take: limit
        }),
        await prisma.user.count()
    ]);

    res.status(200).json({
        success: true,
        count: totalUsers,
        data: {
            users
        }
    })
})

/**
 * @desc    Get user by id
 * @route   GET /api/v1/users/:id
 * @access  Private (admin)
 */
export const getUserById = asyncHandler(async(req, res, next)=> {

    const { id } = req.params;

    const user = await prisma.user.findUnique({
        where: {
            id
        }
    })

    if(!user) {
        return next(new ApiError("user not found", 404));
    }

    res.status(200).json({
        success: true,
        data: {
            user
        }
    })
})

/**
 * @desc    Change user role
 * @route   PUT /api/v1/users/:id
 * @access  Private (admin)
 */
export const changeUserRole = asyncHandler(async(req, res, next)=> {

    const { id } = req.params;
    const { role } = req.body;

    const user = await prisma.user.findUnique({
        where: {
            id
        }
    })

    if(!user) {
        return next(new ApiError("user not found", 404));
    }

    const updatedUserRole = await prisma.user.update({
        where: {
            id: user.id
        },
        data: {
            role
        }
    })

    if(!updatedUserRole) {
        return next(new ApiError("something went wrong", 400));
    }

    res.status(200).json({
        success: true,
        message: "user role updated successfully",
        data: {
            user: {
                ...updatedUserRole
            }
        }
    })
})

