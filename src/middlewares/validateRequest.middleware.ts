import z from "zod";
import { RequestHandler } from "express";
import { ApiError } from "../utils";

export const validateRequest = (schema:  z.ZodObject): RequestHandler => (req, res, next) => {
    const result = schema.safeParse(req.body);

    if(!result.success) {
        const errorPath = result.error.issues[0].path;
        const errorMessage = result.error.issues[0].message;
        return next(new ApiError(`${errorPath}: ${errorMessage}`, 400));
    }

    next();

}
