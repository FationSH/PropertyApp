import express from "express";
import { config } from "dotenv";
import userRouter from "./routes/user.js"
import propertyRouter from "./routes/property.js"
import cookieParser from "cookie-parser";
import { errorMiddleWare } from "./middlewares/error.js";
import cors from "cors";

export const app = express();

config({
    path: "./data/config.env",
})

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))

/**
 * Using Routes
 * api/v1: indicates the api version
 **/
app.use("/api/v1/users", userRouter);
app.use("/api/v1/property", propertyRouter);

// Home router
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Successfully Working"
    })
})

// Using error middleware
app.use(errorMiddleWare)
