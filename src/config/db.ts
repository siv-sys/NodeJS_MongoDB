import mongoose from "mongoose";
import dotenv from "dotenv";

export const connectDB = async () => {
    dotenv.config();
    try {
        await mongoose.connect(process.env.MONGO_URL || "mongodb://localhost:27017/mongodb_node");
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};
