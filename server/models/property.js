import mongoose from "mongoose";

// Property Model
const propertySchema = new mongoose.Schema({
    placeId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    surface: {
        type: Number,
        required: false
    },
    levels: {
        type: Number,
        required: false
    },
    rooms: {
        type: Number,
        required: false
    },
    bathrooms: {
        type: Number,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const PropertyModel = mongoose.model("Property", propertySchema);