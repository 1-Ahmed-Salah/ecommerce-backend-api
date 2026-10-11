import jwt from "jsonwebtoken";
import { prisma } from "../config/db";
import { asyncHandler, ApiError } from "../utils";
import { JWT_SECRET } from "../secrets";

export const protect = asyncHandler(async(req, res, next)=> {

    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {

        token = req.headers.authorization.split(' ')[1];

        try {
            
            const decode = jwt.verify(token, JWT_SECRET) as { userId: string };
            
            const user = await prisma.user.findUnique({ 
                where: {id: decode.userId},
                omit: {
                    password: true
                }
            })

            if(!user) {
                return next(new ApiError('user not found', 404));
            }

            req.user = user;

            next();

        } catch (error) {
            return next(new ApiError('Not authorized, invalid token', 403));
        }

    } else {
        return next(new ApiError('Not authorized, no token', 403))
    }

})

