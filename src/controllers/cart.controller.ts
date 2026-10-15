import { asyncHandler, ApiError } from "../utils";
import { prisma } from "../config/db";

/**
 * @desc    Add item to cart
 * @route   POST /api/v1/cart
 * @access  Private (user logged in)
 */
export const addItemToCart = asyncHandler(async(req, res, next)=> {

    const { productId, quantity } = req.body;
    const userId = req.user.id;

    const product = await prisma.product.findUnique({
        where: {
            id: productId
        }
    })
    if(!product) {
        return next(new ApiError("product does not exists", 404));
    }

    // Check if the product already exists in this user's cart
    const cartItemExists = await prisma.cartItem.findFirst({
        where: {
            userId,
            productId: product.id
        }
    })

    let cartItem;

    if(cartItemExists) {
        cartItem = await prisma.cartItem.update({
            where: {
                id: cartItemExists.id
            },
            data: {
                quantity: {
                    increment: quantity || 1
                }
            }
        })
    } else {
        cartItem = await prisma.cartItem.create({
            data: {
                userId,
                productId: product.id,
                quantity
            }
        })
    }

    res.status(cartItemExists? 200 : 201).json({
        success: true,
        message: cartItemExists? 'Product quantity updated successfully' : 'Product added to cart successfully',
        data: {
            cartItem
        }
    })
})

/**
 * @desc    Delete item from cart
 * @route   DELETE /api/v1/cart/:id
 * @access  Private (user himself)
 */
export const deleteItemFromCart = asyncHandler(async (req, res, next)=> {

    const { id } = req.params;
    const userId = req.user.id;

    // check if cart item belong to the same user
    const cartItem = await prisma.cartItem.findUnique({
        where: {
            id
        }
    })

    if(!cartItem) {
        return next(new ApiError("cart item does not exist", 404));
    }

    // check if user own this cart item
    if(cartItem.userId !== userId) {
        return next(new ApiError("cart item does not belong to user", 401));
    }

    const deletedItem = await prisma.cartItem.delete({
        where: {
            id
        }
    })

    res.status(200).json({
        success: true,
        message: "cart item deleted successfully",
        data: {
            id: deletedItem.id
        }
    })
})

/**
 * @desc    Change the quantity
 * @route   PUT /api/v1/cart/:id
 * @access  Private (user himself)
 */
export const changeQuantity = asyncHandler(async(req, res, next)=> {

    const { id } = req.params;
    const { quantity } = req.body;

    const userId = req.user.id;

    const cartItem = await prisma.cartItem.findUnique({
        where: {
            id
        }
    })
    if(!cartItem) {
        return next(new ApiError("cart item does not exist", 404));
    }

    if(cartItem.userId !== userId) {
        return next(new ApiError("cart item does not belong to user", 401));
    }

    const updatedCart = await prisma.cartItem.update({
        where: {
            id
        },
        data: {
            quantity
        }
    })
    if(!updatedCart) {
         return next(new ApiError("something went wrong", 400));
    }

    res.status(200).json({
        success: true,
        message: "quantity updated successfully",
        data: {
            item: {
                ...updatedCart
            }
        }
    })
})
