import mongoose from "mongoose";

// Connect to DataBase - MongoDB
export const connectDB = () => {
    mongoose
        .connect(process.env.MONGO_URL, {
            dbName: process.env.DB_NAME,
        })
        .then(() => {
            console.log("DataBase Connected");
        })
        .catch((err) => {
            console.log(err);
        });
}
