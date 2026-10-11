import { asyncHandler, ApiError } from "../utils";
import { prisma } from "../config/db";
import { success } from "zod";

/**
 * @desc    Create a new product
 * @route   POST /api/v1/products
 * @access  Private (admin)
 */
export const createProduct = asyncHandler(async(req, res, next)=> {

    const tags = req.body.tags.join(",");

    const product = await prisma.product.create({
        data: {
            ...req.body,
            tags
        }
    })
    if(!product) {
        return next(new ApiError("Something went wrong", 400));
    }

    res.status(201).json({
        success: true,
        data: {
            product
        }
    })
})

/**
 * @desc    Update a product
 * @route   PUT /api/v1/products/:id
 * @access  Private (admin)
 */
export const updaateProduct = asyncHandler(async(req, res, next)=> {
    const { id } = req.params;

    const product = await prisma.product.findFirst({
        where: {
            id
        }
    });

    if(!product) {
        return next(new ApiError("product not found", 404));
    }

    const newProductData = req.body;

    if(newProductData.tags) {
        newProductData.tags =  newProductData.tags.join(',');
    }

    const updatedProduct = await prisma.product.update({
        where: {id},
        data: {
            ...newProductData
        }
    })
    if(!updatedProduct) {
        return next(new ApiError("simething went wrong", 400));
    }

    res.status(200).json({
        success: true,
        message: "product updated successfully",
        data: {
            product: {
                ...updatedProduct
            }
        }
    })
});

/**
 * @desc    Delete a product
 * @route   DELETE /api/v1/products/:id
 * @access  Private (admin)
 */
export const deleteProduct = asyncHandler(async(req, res, next)=> {
    const { id } = req.params;

    const product = await prisma.product.findFirst({
        where: {
            id
        }
    });

    if(!product) {
        return next(new ApiError("product not found", 404));
    }

    const deletedProduct = await prisma.product.delete({
        where: {id}
    });
    if(!deletedProduct) {
        return next(new ApiError("simething went wrong", 400));
    }

    res.status(200).json({
        success: true,
        message: "product updated successfully",
        data: {
            product: {
                id: deletedProduct.id
            }
        }
    })
})

/**
 * @desc    List products
 * @route   GET /api/v1/products
 * @access  Public
 */
export const listProducts = asyncHandler(async(req, res, next)=> {
    
    const page = +req.query.page! || 1;
    const limit = +req.query.limit! || 10;
    const skip = (page -1) * limit;

    const [products, totalProducts] = await Promise.all([
        await prisma.product.findMany({
            skip,
            take: limit
        }),
        await prisma.product.count()
    ])

    res.status(200).json({
        success: true,
        count: totalProducts,
        data: {
            products
        }
    })
})

/**
 * @desc    Get product by id
 * @route   GET /api/v1/products/:id
 * @access  Public
 */
export const getProductById = asyncHandler(async(req, res, next)=> {
    const { id } = req.params;

    const product = await prisma.product.findFirst({
        where: {
            id
        }
    });

    if(!product) {
        return next(new ApiError("product not found", 404));
    }

     res.status(200).json({
        success: true,
        data: {
            product
        }
    })
})
