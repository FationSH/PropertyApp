import { app } from "./app.js";
import { connectDB } from "./data/database.js";

// Connect to DB
connectDB()

// Start Server
app.listen(process.env.PORT, () => {
    console.log(`Server is listening to port: ${process.env.PORT}`);
});