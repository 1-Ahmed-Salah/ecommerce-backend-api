import z from "zod";

export const createCartValidate = z.object({
    productId: z.string().trim(),
    quantity: z.number().optional()
})

