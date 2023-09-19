import express from "express";
import { GetUserProperties, GetAllProperties, AddNewProperty, DeleteProperty, GetSugg } from "../controllers/property.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();


// Add new Property
router.post("/addProperty", isAuthenticated, AddNewProperty);

// Get Users Properties
router.get("/getUserProperties", isAuthenticated, GetUserProperties);

// Get All Properties
router.get("/getAllProperties", GetAllProperties);

// Delete property by id
router.delete("/:id", isAuthenticated, DeleteProperty);

// Get Suggested Area list
router.get("/sugg/:area", GetSugg);

export default router;