import mongoose from "mongoose";

// Mongoose Model
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        select: false,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
});

export const UserModel = mongoose.model("User", userSchema);