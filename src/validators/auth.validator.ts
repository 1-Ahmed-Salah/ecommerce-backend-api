import z from "zod";

export const registerValidate = z.object({
    email: z.email(),
    username: z.string("username is required").trim().min(2),
    password: z.string().trim().min(6)
})

export const loginValidate = z.object({
    identity: z.string().trim().min(2, "username or email is required"),
    password: z.string().trim().min(6)
})

