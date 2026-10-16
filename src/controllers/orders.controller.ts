import { asyncHandler, ApiError } from "../utils";
import { prisma } from "../config/db";

/**
 * @desc    Create an order 
 * @route   POST /api/v1/orders
 * @access  Private (user logged in)
 */
export const createOrder = asyncHandler(async(req, res, next)=> {

    const { id: userId, defaultShippingAddress } = req.user;

    const result = await prisma.$transaction(async(tx)=> {

        const cartItems = await tx.cartItem.findMany({
            where: {
                userId
            },
            include: {
                product: true
            }
        })

        if(cartItems.length === 0) {
            throw new ApiError('cart is empty', 400);
        }

        // calc the amount
        const amount = cartItems.reduce((acc, curr)=> {
            return acc + ( curr.quantity * +curr.product.price)
        }, 0)

        const address = await tx.address.findFirst({
            where: {
                id: defaultShippingAddress
            }
        })

        const order = await tx.order.create({
            data: {
                userId,
                amount,
                address: address?.formattedAddress!,
                products: {
                    create: cartItems.map(cart => {
                        return {
                            productId: cart.productId,
                            quantity: cart.quantity
                        }
                    })
                }
            }
        })

        await tx.orderEvent.create({
            data: {
                orderId: order.id
            }
        })

        await tx.cartItem.deleteMany({
            where: {
                userId
            }
        })

        return { order };
    });

    res.status(201).json({
        success: true,
        message: "order created successfully",
        data: {
            order: result.order
        }
    })
})

