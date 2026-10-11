import bcrypt from "bcryptjs";
import { asyncHandler, ApiError, generateToken } from "../utils";
import { prisma } from "../config/db";
import { hashSalt } from "../secrets";

/**
 * @desc    Register a new user
 * @route   POST /api/v1/auth/register
 * @access  Public
 */
export const register = asyncHandler(async(req, res, next)=> {

    const { email, username, password } = req.body;

    const userExists = await prisma.user.findFirst({
        where: { email }
    })
    if(userExists) {
        return next(new ApiError("User already exists", 400));
    }

    const salt = await bcrypt.genSalt(hashSalt);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
        data: {
            email,
            username,
            password: hashedPassword
        }
    })

    if(!user) {
        return next(new ApiError("Something went wrong", 400));
    }

    res.status(201).json({
        success: true,
        message: "user registerd successfully",
    });
})

/**
 * @desc    Login user
 * @route   POST /api/v1/auth/login
 * @access  Public
 */
export const login = asyncHandler(async(req, res, next)=> {

    const { identity, password } = req.body;

    const user = await prisma.user.findFirst({
        where: {
            OR: [
                { username: identity },
                { email: identity }
            ]
        }
    })
    if(!user) {
        return next(new ApiError("invalid credentials", 400));
    }

    if(!bcrypt.compareSync(password, user.password)) {
        return next(new ApiError("invalid credentials", 400));
    }

    const token = generateToken(user.id);
    
    res.status(200).json({
        success: true,
        message: "user logged in successfully",
        token,
        data: {
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        }
    })
})

/**
 * @desc    Get current user
 * @route   POST /api/v1/auth/me
 * @access  Private
 */
export const getMe = asyncHandler(async(req, res, next)=> {
    const user = req.user;
    res.status(200).json({
        success: true,
        data: {
            user: {
                ...user
            }
        }
    })
})

