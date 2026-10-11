import { RequestHandler } from "express";
import { ApiError } from "../utils";

export const RBAC = (...roles: string[]): RequestHandler => (req, res, next)=> {
    const role = req.user.role;
    if(!roles.includes(role)) {
        return next(new ApiError("Unauthorized", 403))
    }

    next();
}

