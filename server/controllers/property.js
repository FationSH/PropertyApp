import ErrorHandler from "../middlewares/error.js";
import { PropertyModel } from "../models/property.js";
import { createProxyMiddleware } from 'http-proxy-middleware';

// Insert new Property to DB
export const AddNewProperty = async (req, res, next) => {
    try {
        const { placeId, title, type, area, price, surface, levels, rooms, bathrooms, description } = req.body;

        await PropertyModel.create({
            placeId,
            title,
            type,
            area,
            price,
            surface,
            levels,
            rooms,
            bathrooms,
            description,
            user: req.user
        })

        res.status(201).json({
            success: true,
            message: "Property Added Succussfully",
        })
    } catch (error) {
        next(error)
    }
}

// Get Users Properties
export const GetUserProperties = async (req, res, next) => {
    try {
        const userId = req.user._id;

        const userProperties = await PropertyModel.find({ user: userId })
        res.status(200).json({
            success: true,
            userProperties,
        })
    } catch (error) {
        next(error)
    }
}

// Get All Properties
export const GetAllProperties = async (req, res, next) => {
    try {
        const allProperties = await PropertyModel.find({})
        res.status(200).json({
            success: true,
            allProperties,
        })
    } catch (error) {
        next(error)
    }
}

// Delete a Property
export const DeleteProperty = async (req, res, next) => {
    try {
        const { id } = req.params;
        const property = await PropertyModel.findById(id);

        if (!property) return next(new ErrorHandler("Property Not Found", 404))

        await property.deleteOne();
        res.status(200).json({
            success: true,
            message: "Property Got Deleted"
        })
    } catch (error) {
        next(error);
    }
}

// Get Suggested Areas using proxy middleware to change origin
export const GetSugg = createProxyMiddleware({
    target: 'https://4ulq3vb3dogn4fatjw3uq7kqby0dweob.lambda-url.eu-central-1.on.aws/?input=', // target host
    changeOrigin: true, // needed for virtual hosted sites
    pathRewrite: (path) => path.replace('/api/v1/property/sugg/','') // rewrites our endpoints to '' when forwarded to our target
})