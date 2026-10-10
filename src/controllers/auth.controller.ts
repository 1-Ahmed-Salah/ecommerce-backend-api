import bcrypt from "bcryptjs";
import { asyncHandler } from "../utils/asyncHandler";
import { prisma } from "../config/db";
import { hashSalt } from "../secrets";
import { generateToken } from "../utils/generateToken";

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
        throw new Error("User already exists");
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
        throw new Error("Something went wrong");
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
        throw new Error("invalid credentials");
    }

    if(!bcrypt.compareSync(password, user.password)) {
        throw new Error("invalid credentials");
    }

    const token = generateToken(user.id);
    
    res.status(200).json({
        success: true,
        message: "user logged in successfully",
        token,
        data: {
            id: user.id,
            username: user.username,
            email: user.email
        }
    })
})
