import z from "zod";

export const createAddressValidate = z.object({
    lineOne: z.string(),
    lineTwo: z.string().nullable(),
    city: z.string(),
    country: z.string(),
    pincode: z.string().length(6)
})

export const updateAddressValidate = z.object({
    lineOne: z.string().optional(),
    lineTwo: z.string().nullable().optional(),
    city: z.string().optional(),
    country: z.string().optional(),
    pincode: z.string().length(6).optional()
})
