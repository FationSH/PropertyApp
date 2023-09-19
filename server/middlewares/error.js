// Custom Error Class to include Server Status Code
class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

// Error middleware to be used in app.js
export const errorMiddleWare = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;     // 500: Unexpected condition

    return res.status(err.statusCode).json({
        succuss: false,
        message: err.message,
    });
}

export default ErrorHandler;