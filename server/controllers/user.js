import { UserModel } from "../models/user.js";
import bcrypt from "bcrypt";
import { setCookie } from "../utils/cookie.js";
import ErrorHandler from "../middlewares/error.js";

// Get All registerd Users
export const getAllUsers = async (req, res) => {
    const users = await UserModel.find({});
    res.status(200).json({
        success: true,
        users,
    });
};


// Register new User
export const RegisterNewUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        let user = await UserModel.findOne({ email });

        if (user) return next(new ErrorHandler("User Already exist", 404))

        const hasedPassword = await bcrypt.hash(password, 10)
        user = await UserModel.create({
            name,
            email,
            password: hasedPassword,
        });
        setCookie(user, res, "User Registerd Succussfully", 201) // to set cookie
    } catch (error) {
        next(error)
    }
};


// Login User
export const LoginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email }).select("+password");

        if (!user) return next(new ErrorHandler("Invalid User or Password", 404))

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(404).json({
                success: false,
                message: "Invalid User or Password"
            })
        }

        setCookie(user, res, `Welcome back ${user.name}`, 200)
    } catch (error) {
        next(error)
    }
}

// Logout User
export const Logout = (req, res) => {
    res.status(200)
        .cookie("token", "", {
            expires: new Date(Date.now()),
            sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "Development" ? false : true,
        }).json({
            success: true,
            message: "Logout Succussfully"
        });
}

// Get single user detail
export const getUser = (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user,
    });
};
