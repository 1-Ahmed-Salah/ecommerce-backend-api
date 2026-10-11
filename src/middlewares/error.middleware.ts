import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils";
import { NODE_DEV } from "../secrets";

export const notFound = ( req: Request, res: Response, next: NextFunction) => {
    return next(new ApiError(`this route not found ${req.originalUrl}`, 404));
}

export const errorHandler = (err: ApiError, req: Request, res: Response, next: NextFunction) => {

    const message = err.message;
    const statusCode = err.statusCode || 500;
    const status = err.status || 'error';
    const isOperational = err.isOperational || false;

    res.status(statusCode).json({
        message,
        status,
        isOperational,
        stack: NODE_DEV === "development"? err.stack : null
    })
}

