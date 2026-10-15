import z from "zod";

export const createProductValidate = z.object({
    name: z.string().trim().min(2, "name is required"),
    description: z.string().trim(),
    price: z.number(),
    tags: z.array(
        z.string().trim().min(1, "tag is required")
    ).min(1, "At least one tag is required")
})

export const updateProductValidate = z.object({
    name: z.string().trim().min(2, "name is required").optional(),
    description: z.string().trim().optional(),
    price: z.number().min(0).optional(),
    tags: z.array(
        z.string().trim().min(1, "tag is required")
    ).min(1, "At least one tag is required").optional()
})
