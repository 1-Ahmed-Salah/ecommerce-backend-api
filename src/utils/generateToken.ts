import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";

export const generateToken = (userId: string): string => {
    return jwt.sign({userId}, JWT_SECRET);
}

