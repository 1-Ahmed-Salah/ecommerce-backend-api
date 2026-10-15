import z from "zod";

export const createCartValidate = z.object({
    productId: z.string().trim(),
    quantity: z.number().optional()
})

export const updateQuantityValidate = z.object({
    quantity: z.number()
})
