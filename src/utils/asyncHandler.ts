import { RequestHandler } from "express";

export const asyncHandler = (callback: RequestHandler): RequestHandler => (req, res, next) => {
    Promise.resolve(callback(req, res, next)).catch(next);
}
