import z from "zod";

export const updateUserValidate = z.object({
    username: z.string().optional(),
    email: z.string().optional(),
    defaultShippingAddress: z.string().optional(),
    defaultBillingAddress: z.string().optional()
})

