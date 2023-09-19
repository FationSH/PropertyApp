import express from "express";
import { LoginUser, Logout, RegisterNewUser, getAllUsers, getUser } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();


// Get all users (Read)
router.get("/all", getAllUsers);

// New user (Write)
router.post("/register", RegisterNewUser);

// Login user
router.post("/login", LoginUser);

// Logout user
router.get("/logout", Logout);

// Get user
router.get("/user", isAuthenticated, getUser);

export default router;
