import jwt from "jsonwebtoken"
import { UserModel } from "../models/user.js";

// Middleware to check if user is logged berfore accessing api
export const isAuthenticated = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(404).json({
                success: false,
                message: "Login First"
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await UserModel.findById(decoded._id);
        next();
    } catch (error) {
        res.status(404).json({
            success: false,
            error,
        })
    }
}