import jwt from "jsonwebtoken"

// Set cookies to remember user 1 day
export const setCookie = (user, res, message, statusCode = 200,) => {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
    res.status(statusCode).cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,        // 24 hours
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
    }).json({
        success: true,
        message,
    });
}