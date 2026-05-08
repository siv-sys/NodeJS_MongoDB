import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./config/db";
import userRouter from "./routes/userRouter";

dotenv.config();
const app = express();
app.use(express.json());

// Connect to Database
connectDB();

// Routes
app.use("/api/users", userRouter);

app.listen(3000, () => {
    console.log("http://localhost:3000");
});

