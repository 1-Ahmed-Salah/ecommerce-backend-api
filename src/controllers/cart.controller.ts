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
                    increment: 1
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


